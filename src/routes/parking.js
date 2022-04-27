const express = require('express'); 
const router = express.Router()
const {  getParkings, getParking, addParking, deleteParking } = require('../controllers/parking')
const { validatorNewParking } = require('../utils/validators')

// GET localhost:3000/api/v1/parking
router.get('/', getParkings )
router.get('/:id', getParking)
router.post('/', validatorNewParking, addParking)
router.delete('/:id', deleteParking)

module.exports = router