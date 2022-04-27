require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()


//Middlewares
app.use(cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
  next(); // Important
})

app.use(express.json())

const PORT = process.env.PORT || 3000

// Imports routes
app.use('/api/v1', require('./src/routes/index'))

const server = app.listen(PORT, () => {
    console.log('Server on port: ' + PORT);
})

module.exports = { app, server }
 