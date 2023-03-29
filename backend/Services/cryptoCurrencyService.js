const axios = require("axios");
require('dotenv').config();
module.exports =  class CryptoCurrencyService {


   //obtener las criptomonedas
   async getCryptoCurrency(){

    try {

        const response = await axios.get(process.env.COIN_BASE_URL + 'currencies/crypto')
        return response.data
        
    }catch(e){
        return e
    }

  }

  //obtener el valor de una criptomoneda
  async priceCryptoCurrency(id){

    try {

        const response = await axios.get(process.env.COIN_BASE_URL + 'prices/'+id+'-USD/buy')
        return response.data

    }catch(e){
        return e
    }

  }

  
}


