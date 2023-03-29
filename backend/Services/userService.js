
const User = require('../Models/User');

module.exports =  class UserService {


   //obtener las información de el usuario
   async getUser(id){

    try {

        var userResource = null

        userResource = await User.findOne({ where: { id: id} })

        return  userResource.dataValues;

        
    }catch(e){
        return e
    }

  }

     //actualizar información de el usuario
     async updateUser(data){

        try {
            
            var user = {}
            var userResource = null

            user.name = data.name
            user.description = data.description
    
            userResource = await User.update(user, { where: { id: data.id }})
    
            return  userResource;
    
            
        }catch(e){
            return e
        }
    
      }


  
}


