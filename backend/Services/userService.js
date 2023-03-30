
const User = require('../Models/User');
require('dotenv').config();
module.exports =  class UserService {


   //obtener las información del usuario
   async getUser(id){

    try {

        var userResource = null

        userResource = await User.findOne( { where: { id: id}, attributes: ['id','name', 'email','image', 'description', 'created_at', 'updated_at'] })

        return  userResource.dataValues;

        
    }catch(e){
        return e
    }

  }

     //actualizar información del usuario
     async updateUser(data,file){

        try {

            var user = {}
            var userResource = null
            var userUpdate = null
            var fileName = null

            userResource = await User.findOne({ where: { id: data.id } })

            
            if(file){
                console.log('file name***')
  
                user.image = 'http://localhost:'+ process.env.PORT + '/public/'+file.filename
            }

            user.name = data.name
            user.description = data.description
    
            userUpdate = await User.update(user, { where: { id: data.id }})

            
            console.log('el userupdate', userUpdate)
    
            return  { userResource, userUpdate };
    
            
        }catch(e){
            return e
        }
    
      }


  
}


