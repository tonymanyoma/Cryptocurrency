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
                res.json({
                    message: 'Criptomonedas consultadas',
                    data: result,
                    status: 200,
                });
            }else{
                res.json({
                    message: 'Ocurrió un error al consultar las criptomonedas',
                    status: 422,
                });
            }
     

	},

    priceCryptoCurrency: async (req, res) => {

        var id = req.body.id
        var crypto = new cryptoCurrencyService();

        var result = await crypto.priceCryptoCurrency(id)

        console.log('result', result)
         if(result){
             res.json({
                 message: 'Precio consultado',
                 data: result,
                 status: 200,
             });
         }else{
             res.json({
                 message: 'Ocurrió un error al consultar el precio',
                 status: 422,
             });
         }
  

 },


}





module.exports = controller;