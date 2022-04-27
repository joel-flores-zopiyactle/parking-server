const { v4: uuidv4 } = require('uuid');
const {writeData, readData} = require('./dbwr')

let collectionDB = []

// Operaciones

/* 
* Regresa una lista de datos
*/
const get = () => {

    return new Promise( (resolve, reject) => {
        const readFile = readData() // Leeo los archivos del fichero

        if(!readFile) {
            reject('No se pudo leer el archivo .json')  
        }

        resolve(readFile)    
    })    
}

/* 
*   Agrega un nuevo dato
*/
const add = (data) => {
    return new Promise( (resolve, reject) => {

        let newData = data
        newData.id = uuidv4(); // Genero un id dinámico
        
        const readFile = readData() // Leeo los archivos del fichero

        if(!readFile) {
            reject('No se pudo leer el archivo .json')
        } 
        
        collectionDB = readFile

        collectionDB.push(newData)
        
        const res = writeData(collectionDB) // Reescribo la data al archivo

        if(res) {

            resolve(newData)

        } 
        
        reject(res)
    })
    
}

/* 
*   Busca un dato por id
*/
const find = (id) => {

    return new Promise( (resolve, reject) => {

        const readFile = readData() // Leeo los archivos del fichero

        if(!readFile) {
            // No se pudo leer el archivo correctamente
            reject('No se pudo leer el archivo .json')
        }
    
        const result = readFile.find( data => data.id === id)
        
        if(result) {
            resolve(result)
        }
        
        resolve(null) // Si no hay resultado de busqueda se regresa un array vacío
    })
    
    
}

/* 
*   Elimina un dato por id
*/
const remove = (id) => {
    return new Promise( (resolve, reject) => {
        
        const readFile = readData() // Leeo los archivos del fichero

        if(!readFile) {
            // No se pudo leer el archivo correctamente
            reject('No se pudo leer el archivo .json')
        }

        const resultFind = readFile.find( data => data.id === id)

        if(resultFind) {

            collectionDB = readFile.filter( data => data.id !== id) //  Filtro los datos para crear un nuevo array sin la data que se recibe como parametro 
    
            const res = writeData(collectionDB) // Reescribo la data al archivo
    
            if(res) {
                resolve(true)
            }

            reject('No se pudo eliminar el dato')
        }
        
        resolve(false) // Si regresa false no hay resultados de ID que se esta trataando de eleminar
    })
   
}


module.exports = { get, add, remove, find }


