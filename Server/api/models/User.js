"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Code, {foreignKey:'positionID',targetKey:'keyMap',as:'positionData'});
      User.belongsTo(models.Code, {foreignKey:'gender',targetKey:'keyMap',as:'genderData'});
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.STRING,
      phoneNumber:DataTypes.INTEGER,
      password:DataTypes.STRING,
      image:DataTypes.STRING,
      positionID:DataTypes.STRING,
      roleID:DataTypes.STRING
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};