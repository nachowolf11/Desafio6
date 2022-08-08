const socket = io();

const btnEnviar = document.getElementById('enviarMsj')

btnEnviar.onclick = e => {
    e.preventDefault()
    const msn = document.getElementById('mensaje').value
    const mail = document.getElementById('mail').value
    const fecha = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    socket.emit('chat-in',{msn:msn,mail:mail,fecha:fecha})
}
console.log('holaaa');

// cargarHistorial()
cargarProductos()

socket.on('chat-out', data => {
    renderMensaje(data)
})

function renderMensaje(msn) {
    const mensajes = document.getElementById('mensajes')
    mensajes.innerHTML += 
    `<span class="mail">${msn.mail}</span> <span class="fecha">[${msn.fecha}]</span> <span class="msn">: ${msn.msn}</span><br>`
}

function loadFileToDiv(data) {
    data.forEach(msn => {
        renderMensaje(msn)
    });
}

function cargarHistorial() {
    fetch('/data')
        .then(data => data.json())
        .then(data => {loadFileToDiv(data.data)})
}

const sendForm = document.getElementById('sendForm')
sendForm.onclick = e => {
    e.preventDefault()
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    socket.emit('item-in',{title:title,price:price,thumbnail:thumbnail})
}

socket.on('item-out', data => {
    console.log(data);
    renderItem(data)
})

function renderItem(item) {
    const items = document.getElementById('items')
    items.innerHTML += `
    <div class="row g-0">
        <div class="col-4 border-bottom border-end bg-secondary border-start d-flex justify-content-center">${item.title}</div>
        <div class="col-4 border-bottom border-end bg-secondary d-flex justify-content-center">${item.price}</div>
        <div class="col-4 border-bottom border-end bg-secondary d-flex justify-content-center"><img src="${item.thumbnail}"></div>
    </div>
    `
    document.getElementById('emptyList').classList.add('d-none')
    document.getElementById('items').classList.remove('d-none')
}

function cargarProductos() {
    fetch('/data2')
        .then(data => data.json())
        .then(data => {loadItemsToDiv(data.data)})
}

function loadItemsToDiv(data) {
    if(data.length > 0){
        data.forEach(item => {
            renderItem(item)
        })
        document.getElementById('emptyList').classList.add('d-none')
        document.getElementById('items').classList.remove('d-none')

    }
}