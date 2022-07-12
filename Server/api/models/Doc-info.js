"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DocInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DocInfo.belongsTo(models.User,{foreignKey:'docID'})
      DocInfo.belongsTo(models.Code,{foreignKey:'priceID',targetKey:'keyMap',as:'priceTypeData'})
      DocInfo.belongsTo(models.Code,{foreignKey:'paymentID',targetKey:'keyMap',as:'paymentTypeData'})
    }
  }
  DocInfo.init(
    {
      docID: DataTypes.INTEGER,
      priceID: DataTypes.STRING,
      paymentID: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DocInfo",
    }
  );
  return DocInfo;
};
