const { check, validationResult  } = require('express-validator')

const validatorNewParking = [
    check("address").exists().notEmpty(),
    check("amenities").exists().notEmpty(),
    check("score").exists().notEmpty().isDecimal(),
    check("price").exists().notEmpty().isDecimal(),
    check("type").exists().notEmpty(),
    check("image").exists(),
    check("description").exists(),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(403)
            res.send({errors: error.array()})
        }
    }
]

module.exports  = { validatorNewParking }