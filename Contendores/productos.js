const fs = require('fs')

class Contenedor{
    constructor(nombre){
        this.nombre = nombre
    }
    getAll() {
        try {
            const arr = fs.readFileSync(this.nombre, 'utf-8');
            const arrParsed = JSON.parse(arr);
            return arrParsed;
        } catch (err) {
        }
    }
    async save(producto){
        try {
            const arr = await this.getAll()
            if(arr){
                arr.push(producto)
                await fs.promises.writeFile(this.nombre,JSON.stringify(arr))
            }else{
                const arr = [producto]
                await fs.promises.writeFile(this.nombre,JSON.stringify(arr))
            }
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = Contenedor;