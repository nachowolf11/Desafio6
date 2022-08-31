
const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    try {
        res.render('productos.pug',)
    } catch (error) {
        res.json(error)
    }
}) 

router.get('/:id',(req,res)=>{
    try {
        const buscado = Contenedor.productos.find(producto => producto.id = req.params.id)
        res.json(buscado)
    } catch (error) {
        res,json(error)
    }
})

router.post('/', (req,res)=>{
    try {
        const newProducto = new Contenedor({
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        })
        Contenedor.productos.push(newProducto)
    } catch (error) {
        res.json(error)
    }
})

router.put('/:id', (req,res)=>{
    try {
        const indice = Contenedor.productos.findIndex(producto => producto.id == req.params.id)
        Contenedor.productos[indice].producto = req.body
        res.json(Contenedor.productos)
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id',(req,res)=>{
    try {
        if (req.params.pos > Contenedor.productos.length) {
            res.json({error: `No existe el ID solicitado.`})
        } else {
            const indice = req.params.pos - 1
            const eliminado = {
                eliminada: Contenedor.productos.splice(indice,1)
            }
            res.json(eliminado)
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports.router = router;
