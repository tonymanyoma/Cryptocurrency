var express = require('express');
var userController = require('../Controllers/userController');
const auth = require('../Middlewares/auth');
const user = require('../Middlewares/updateUserValidator');

const upload = require('../Middlewares/storage');

var router = express.Router();



// Rutas de criptomonedas
router.post('/user/getUser', auth.validateToken, userController.getUser);
router.post('/user/updateUser', upload.single('image') ,auth.validateToken, user.validateUser, userController.updateUser);

module.exports = router;