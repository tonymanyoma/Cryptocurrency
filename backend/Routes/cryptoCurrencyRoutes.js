var express = require('express');
var cryptoCurrencyController = require('../Controllers/cryptoCurrencyController');
const auth = require('../Middlewares/auth');


var router = express.Router();



// Rutas de criptomonedas
router.get('/crypto/getCryptoCurrency',  cryptoCurrencyController.getCryptoCurrency);
router.post('/crypto/priceCryptoCurrency',  cryptoCurrencyController.priceCryptoCurrency);

module.exports = router;