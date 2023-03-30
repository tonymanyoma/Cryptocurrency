
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
        
        // console.log('info user', req.file)
        const file = req.file
        const userUpdateDto = req.body;

        var user = new userService();

        var result = await user.updateUser(userUpdateDto, file)

        console.log(result)

        if(result.userResource && result.userUpdate){
            res.status(200).send({
                message: 'Usuario actualizado'
            });
        }

        if( result.userResource == null ){
            res.status(422).send({
                message: 'No se  encuentra un usuario con ese id'
            });
        }

        if(result.userUpdate.length < 0){
            res.status(422).send({
                message: 'No fue posible actualizar el usuario'
            });
        }

  
 },



}


module.exports = controller;