
require('dotenv').config();

const cryptoCurrencyService = require('../Services/cryptoCurrencyService')

var controller = {


    getCryptoCurrency: async (req, res) => {
           var cryptoCurrency = new cryptoCurrencyService();

           var result = await cryptoCurrency.getCryptoCurrency()

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
        var cryptoCurrency = new cryptoCurrencyService();

        var result = await cryptoCurrency.priceCryptoCurrency(id)

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