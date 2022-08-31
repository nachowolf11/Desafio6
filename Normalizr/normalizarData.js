const fs = require('fs')
const {schema,normalize,denormalize} = require('normalizr')

const autorSchema = new schema.Entity('autor')
const mensajeSchema = new schema.Entity('mensaje',{
    autor: autorSchema
})

fs.readFile('./data.json','utf-8',(err,data)=>{
    json = JSON.parse(data)
    const dataNormalized = normalize(json, [mensajeSchema])
    fs.writeFile('./datanormalizada.json',JSON.stringify(dataNormalized),e=>console.log(e))
})