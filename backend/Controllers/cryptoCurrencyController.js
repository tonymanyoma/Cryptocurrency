const moment = require('moment');
const crypto = require('crypto');
const CryptoJS = require("crypto-js");
require('dotenv').config();

const cryptoCurrencyService = require('../Services/cryptoCurrencyService')

var controller = {


    getCryptoCurrency: async (req, res) => {
           var crypto = new cryptoCurrencyService();

           var result = await crypto.getCryptoCurrency()

            if(result){
                res.status(200).send({
                    message: 'Criptomonedas consultadas',
                    data: result.data
                });
            }else{
                res.status(422).send({
                    message: 'Ocurrió un error al consultar las criptomonedas'
                });
            }
     

	},


    priceCryptoCurrency: async (req, res) => {

        var id = req.body.id
        var crypto = new cryptoCurrencyService();

        var result = await crypto.priceCryptoCurrency(id)

         if(result){
             res.status(200).send({
                 message: 'Precio consultado',
                 data: result
             });
         }else{
             res.status(422).send({
                 message: 'Ocurrió un error al consultar el precio'
             });
         }
  

 },


}


module.exports = controller;