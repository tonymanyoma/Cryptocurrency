var express = require('express');
var cryptoCurrencyController = require('../Controllers/cryptoCurrencyController');
const auth = require('../Middlewares/auth');


var router = express.Router();



// Rutas de criptomonedas
router.get('/crypto/getCryptoCurrency', auth.validateToken, cryptoCurrencyController.getCryptoCurrency);
router.post('/crypto/priceCryptoCurrency', auth.validateToken, cryptoCurrencyController.priceCryptoCurrency);

module.exports = router;