const moment = require('moment');
const crypto = require('crypto');
const CryptoJS = require("crypto-js");
require('dotenv').config();

const authService = require('../Services/authService')

var controller = {

    login: async (req, res) => {

           const userLoginDto = req.body;

           var auth = new authService();

           var result = await auth.login(userLoginDto)

           if(result.userResource){

                if(result.match){
                    res.status(200).send({
                        message: 'Sesión iniciada con éxito',
                        token: result.accessToken.token,
                        userId: result.userResource.id
                    });
                }else{
                    res.status(422).send({
                        message: 'Contraseña incorrecta'
                    });
                }

           }else{
            res.status(422).send({
                message: 'No existe un usuario con ese email'
            });
           }

     


	},

    register: async (req, res) => {

        const userRegisterDto = req.body;

        var auth = new authService();

        var result = await auth.register(userRegisterDto)


        if(result.user){
            res.status(422).send({
                message: 'Ya existe un usuario con ese email'
            });
        }else{
            res.status(200).send({
                message: 'Usuario registrado con éxito',
                data: result.newUser
            });
        }


    },



}





module.exports = controller;