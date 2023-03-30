const { body, validationResult } = require('express-validator');

const middleware = {

    validateUser:  function (req, res, next) {

        body('id').exists().isNumeric().withMessage('El nombre es requerido')(req, res, err => {
            if (err) {
                return next(err);
            }

            body('name').exists().isString().withMessage('El nombre es requerido')(req, res, err => {
                if (err) {
                    return next(err);
                }

                        body('description').exists().isString().withMessage('La descripción es requerida')(req, res, err => {
                            if (err) {
                                return next(err);
                            }

                                                
                            try {
                                validationResult(req).throw();
                                next();
                            } catch (err) {
                                res.status(422).json({ errors: err.mapped() });
                            }
            
                        })
    

            })

        })

      
    }
}

module.exports = middleware;