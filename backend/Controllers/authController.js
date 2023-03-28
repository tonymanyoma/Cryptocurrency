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

           console.log('result', result)

           if(result.userResource){

                if(result.match){
                    res.json({
                        message: 'Sesión iniciada con éxito',
                        data: result.accessToken.token,
                        status: 200,
                    });
                }else{
                    res.json({
                        message: 'Contraseña incorrecta',
                        status: 422,
                    });
                }

           }else{
            res.json({
                message: 'No existe un usuario con ese email',
                status: 422,
            });
           }

     


	},

    register: async (req, res) => {

        const userRegisterDto = req.body;

        var auth = new authService();

        var result = await auth.register(userRegisterDto)


        if(result.user){
            res.json({
                message: 'Ya existe un usuario con ese email',
                status: 422,
            });
        }else{
            res.json({
                message: 'Usuario registrado con éxito',
                data: result.newUser,
                status: 200,
            });
        }


    },



}





module.exports = controller;