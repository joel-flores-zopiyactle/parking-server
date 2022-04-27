const filterData = (data, filter) => {
    
    let resultaData = data;

    if(filter.maxPrice && parseFloat(filter.maxPrice) !== 0) {
        resultaData = resultaData.filter(data => data.price <= parseFloat(filter.maxPrice))
     }

     if(filter.minPrice) {
         resultaData = resultaData.filter(data => data.price >= parseFloat(filter.minPrice))
     }

     if(filter.type && filter.type !== '') {
         resultaData = resultaData.filter(data => data.type === filter.type)
     }

     if(filter.amenities && filter.amenities !== '') {

         const amenities = filter.amenities.split(','); // Convermitos el string a array de strings
         /* console.log(amenities)  */
         resultaData = resultaData.filter(data => { // Se filtar la data total
            
            let totalResultMatch = 0

            data.amenities.filter(d => { // Se filtran las comodidades de la data
                // Buscamos del valor de data.amenties a amenties de la petición
                const res = amenities.find( a => a === d)
                // Si hay result incrementamos 1 a totalResultMatch
                if(res) {

                    totalResultMatch++
                }
            })

            // Si dentro de la data hay al menos una coucidencia en la peticion del cliente regresamos la data
            // como resultado para mostrarle al cliente
            if(totalResultMatch > 0) {
                return data
            }

            // Si no hay coucidencias en la data no regresamos nada
         })
     }

    return resultaData
}


module.exports = { filterData  }