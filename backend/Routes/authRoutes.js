var express = require('express');
var authController = require('../Controllers/authController');
const loginValidator = require('../Middlewares/loginValidator');
const registerValidator = require('../Middlewares/registerValidator');

var router = express.Router();



// Rutas de autenticación
router.post('/auth/login', loginValidator.validateLogin, authController.login);
router.post('/auth/register', registerValidator.validateRegister, authController.register);


module.exports = router;