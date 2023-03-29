
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/Db.js');


class User extends Model {}
User.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    }
},{
    sequelize,
    modelName: 'user'
})




module.exports = User;
