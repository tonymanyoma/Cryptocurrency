const { body, validationResult } = require('express-validator');
const User = require('../Models/User');

const middleware = {

    validateLogin: function (req, res, next) {

        body('email').isEmail().withMessage('Ingrese un email con formáto válido')(req, res, err => {
            
            if (err) {
                return next(err);
            }
        
            body('password').isLength({ min: 6 }).withMessage('La contraseña debe de tener minimo 6 caracteres')(req, res, err => {
                if (err) {
                    return next(err);
                }
        
                try {
                    validationResult(req).throw();
                    next();
                } catch (err) {
                    res.status(422).json({ errors: err.mapped() });
                }
            });
        })

      
    }
}

module.exports = middleware;