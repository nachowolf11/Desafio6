const fs = require('fs')
const {schema,normalize,denormalize} = require('normalizr')

const autorSchema = new schema.Entity('autor')
const mensajeSchema = new schema.Entity('mensaje',{
    autor: autorSchema
})

fs.readFile('./datanormalizada.json','utf-8',(err,data)=>{
    json = JSON.parse(data)
    const dataDenormalized = denormalize(json.result, [mensajeSchema],json.entities)
    fs.writeFile('./datadesnormalizada.json',JSON.stringify(dataDenormalized),e=>console.log(e))
})