const express = require('express')
const router = require('./prodRouter.js')
const { Server} = require('socket.io')
const http = require('http')
const Chat = require('./Contendores/chat')
const Contenedor = require('./Contendores/productos')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const chat = new Chat('chat.json')
const producto = new Contenedor('productos.json')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('views','./views');
app.set('view engine', 'pug');

const PORT = process.env.PORT || 8080

app.use('/api/productos',router.router)

app.use('/public', express.static(__dirname + '/public'))

app.get('/data',(req,res)=>{
    const data = chat.getAll()
    res.json({data})
})

app.get('/data2',(req,res)=>{
    const data = producto.getAll()
    res.json({data})
})

server.listen(8080,()=>{
    console.log('SERVER ON');
})

io.on('connection',(socket)=>{
    console.log('Usuario conectado');
    socket.on('chat-in', data => {
        chat.save(data)
        const dataOut = data
        io.sockets.emit('chat-out',dataOut)
    })
    socket.on('item-in', data => {
        producto.save(data)
        const dataOut = data
        io.sockets.emit('item-out',dataOut)
    })
})

server.on('error', e => console.log(`Error on server`,e))
