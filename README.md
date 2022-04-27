# Server

La aplicación Server cuenta con la funcionalidad de llevar la lógica de almacenamiento y control de los datos del estacionamiento.

## Instalar paquetes

```bash
    npm install
```
## Ejecutar la aplicación

```bash
    npm run  start
```
o

```bash
    node app.js
```
Todos los datos que procesa la aplicación son almacenados en una archivo .JSON para poder persistir los datos.El archivo se llama parkingDB.json

## Endpoints que expone la aplicación.

```bash
    GET: 	 http://localhost:3000/api/v1/parking
    POST:    http://localhost:3000/api/v1/parking
    GET:     http://localhost:3000/api/v1/parking/{ID}
    DELETE:  http://localhost:3000/api/v1/parking/{ID}
```

Para en el primer endpoint obtiene todos los estacionamientos registrados en la aplicación, pero además permite recibir parámetros de búsqueda más específica. 

## Los parámetros que recibe son:
```bash
type	   :  string
maxPrice   :  number
minPrice   :  number
amenities  :  [ string]
```
```bash

    GET:    http://localhost:3000/api/v1/parking?type=”Private“&maxPrice =500&minPrice=100&amenities =[“Vigilancia”, “Planta baja”]

```

## Registrar nuevo estacionamiento

Para registrar un nuevo estacionamiento mandamos la siguiente data:
```bash
{
    "address"     : "Test 1, N-12",
    "amenities"   : ["test 1", "test 2"],
    "score"       : 3,
    "price"       : 2000,
    "type"        : "Private",
    "image"       : "", // Url 
    "description" : "Grande de color blanco"
} 
```

## Respuesta de los endpoints

```bash
    {
        "response": {
            "code": 404,
            "message": "Message'",
            "data": []
        }
    }
```

Si la respuesta es exitosa o ocurrió algún error la aplicación responde con un mensaje con el código, message, y una data dependiendo de la operación realizada. 
