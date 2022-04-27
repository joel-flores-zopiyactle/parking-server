const { get, add, find, remove } = require('../models/parking')
const { httpResponse } = require('../utils/responseHandler')
const { filterData } = require('../utils/filter')

/* 
*   /GET: All
*  
*/
const getParkings = async (req, res) => {
    try {
        //maxPrice, minPrice, type, amenities
        const filter = req.query

        const data =  await get()
        
        const newResult = filterData(data, filter)
        
        if(newResult.length > 0) {
            httpResponse(res, "Operacion exitosa", newResult, 200)
            return
        }

        httpResponse(res, "No hay resultados de la busqueda", newResult, 200)
       
    } catch (error) {
        httpResponse(res, error)
    }
}

/* 
*   /GET: One
*
*/
const getParking = async (req, res) => {
    try {
        const id = req.params.id
        const data = await find(id)
        
        if(data) {
            httpResponse(res, "Operacion exitosa", data, 200)
        } else {
            httpResponse(res, `No hay resultados de la busqueda con el ID '${id}'`, [], 404)
        }
        
    } catch (error) {
        
        httpResponse(res, "Ocurrio un error al realiar la busqueda", error, 500)
    }
}

/* 
*   /POST: new 
*
*/
const addParking = async (req, res) => {

    try {
        
        const newParking = req.body

        const data = await add(newParking)

        httpResponse(res, "Registro realizado exitosamente", data, 201)

    } catch (error) {
        httpResponse(res, error)
    }

}

/* 
*   /DELETE:  
*
*/
const deleteParking = async (req, res) => {
    try {
        const id = req.params.id
        const response = await remove(id)
        
        if(response) {
            httpResponse(res, `Dato con el ID '${id}' se a eliminado correctamente`, [], 200)
        } else {
            httpResponse(res, `No se encuntro el dato del ID '${id}' para eliminar`, [], 404)
        }
        
    } catch (error) {
        httpResponse(res, 'Ocurrio un error en el servidor', error, 500 )
    }
}

module.exports = { getParkings, getParking, addParking, deleteParking }

