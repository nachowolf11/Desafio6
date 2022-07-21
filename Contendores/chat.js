const fs = require ('fs')

class Chat{
    constructor(nombre){
        this.nombre = nombre //Nombre del archivo
    }
    getAll() {
        try {
            const arr = fs.readFileSync(this.nombre, 'utf-8');
            const arrParsed = JSON.parse(arr);
            return arrParsed;
        } catch (err) {
        }
    }
    async save(mensaje){
        try {
            const arr = await this.getAll()
            if(arr){
                arr.push(mensaje)
                await fs.promises.writeFile(this.nombre,JSON.stringify(arr))
            }else{
                const arr = [mensaje]
                await fs.promises.writeFile(this.nombre,JSON.stringify(arr))
            }
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = Chat;