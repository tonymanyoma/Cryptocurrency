
require('dotenv').config();

const userService = require('../Services/userService')

var controller = {


    getUser: async (req, res) => {
           var id = req.body.id
           var user = new userService();

           var result = await user.getUser(id)

            if(result){
                res.status(200).send({
                    message: 'Usuario consultado',
                    data: result
                });
            }else{
                res.status(422).send({
                    message: 'Ocurrió un error al consultar la información del usuario'
                });
            }
     
	},

    updateUser: async (req, res) => {

        const userUpdateDto = req.body;

        var user = new userService();

        var result = await user.updateUser(userUpdateDto)

         if(result){
             res.status(200).send({
                 message: 'Usuario actualizado'
             });
         }else{
             res.status(422).send({
                 message: 'Ocurrió un error al consultar la información del usuario'
             });
         }
  
 },



}


module.exports = controller;