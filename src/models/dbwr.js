const fs = require('fs')

const pathFile = './src/models/parkingDB.json'

/* 
*   Escribe los datos en el archivo JSON    
*   @Params { file }
*/
const writeData = (file) => {

    try {
        const data = JSON.stringify(file)

        fs.writeFileSync(pathFile, data, (err) => {
            if(err) {
                throw(err) // Si ocurrio un erro se return err
            }
        })

        return true

    } catch (error) {
        return {
            error: error,
            message: "No se pudo escribír los datos en el archivo para guardar los datos"
        }
    }
}

/* 
*   Lee los datos del archivo JSON    
*   @Params {  }
*/
const readData = () => {

    try {
        // Leemos el archivo
        const options = {
            encoding: 'utf8'
        }

        if(!fs.existsSync(pathFile)) {

            fs.writeFileSync(pathFile, '[]', (err) => { if(err) { throw err }})   
            return []

        } 

        const data = fs.readFileSync(pathFile, options)
        return JSON.parse(data)
            
    } catch (error) {
        // Si el archivo no exite se genera un error asi que entonces creamos un archivo con un array Vacío
        return "Ocurrio un error al leer el archivo"

    }

}


module.exports = { writeData, readData }