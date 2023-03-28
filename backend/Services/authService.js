const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const { json } = require("body-parser");


module.exports =  class AuthService {

 generateAccessToken(data) { 

    const user = data;
    const payload = { user: user.dataValues };

    var tokens = {};
      
    tokens.token =  jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES} )
    tokens.refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRATION} )

    return tokens

}

  async  login(data){

    try {

        var userResource = null
        var accessToken = null
        var match = null

        userResource = await User.findOne({ where: { email: data.email} })

        match = await bcrypt.compare(data.password, userResource.password);

        accessToken = this.generateAccessToken(userResource);

        return  { userResource, match, accessToken };


        
    }catch(e){
        return e
    }

  }

  async  register(data){

    try {

        var user = null
        
        user = await User.findOne({ where: { email: data.email} })

        //registrar usuario

        var newUser = {}
        newUser.name = data.name
        newUser.email = data.email
        // newUser.image = data.body.image
        newUser.description = data.descripction
        newUser.password = await bcrypt.hash(data.password, 10);
        newUser = await User.create(newUser)

        return {user, newUser}
   
        
    }catch(e){
        return e
    }
  }
  
}
//   module.exports = {login,register}

