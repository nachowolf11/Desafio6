const express = require('express')
const router = require('./prodRouter.js')
const { Server} = require('socket.io')
const http = require('http')
const Chat = require('./Contendores/chat')
const { options } = require('./Options/db')
const { faker } = require('@faker-js/faker')
const knex = require('knex')(options)

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const chat = new Chat('chat.json')
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
    const arrProd = []
    knex.select('*').from('productos')
        .then(productos => {
            for (const producto of productos) {
                arrProd.push({
                    title:producto.title,
                    price:producto.price,
                    thumbnail:producto.thumbnail
                })
            }
            res.json({data:arrProd})
        })
        .catch(err=>{console.log(err);throw err})
})

app.get('/api/productos-test',(req,res)=>{
    try {
        const arrProd = []
        let prod = {}
        for (let i = 0; i < 5; i++) {
            prod = {
                title: faker.commerce.product(),
                price: faker.commerce.price(),
                thumbnail: faker.image.food(100,100,true)
    
            }
            arrProd.push(prod)
        }
        res.json({data:arrProd})   
    } catch (error) {
        console.log(error);
    }
})

server.listen(PORT,()=>{
    console.log('SERVER ON');
})

io.on('connection',(socket)=>{
    console.log('Usuario conectado');
    socket.on('chat-in', data => {
        chat.save(data)
        const dataOut = data
        io.sockets.emit('chat-out',dataOut.mensaje)
    })
    socket.on('item-in', data => {
        knex('productos').insert({title:data.title,price:data.price,thumbnail:data.thumbnail})
            .then(()=>console.log('Producto guardado'))
            .catch(err=>{console.log(err);throw err})
        const dataOut = data
        io.sockets.emit('item-out',dataOut)
    })
})

server.on('error', e => console.log(`Error on server`,e))
