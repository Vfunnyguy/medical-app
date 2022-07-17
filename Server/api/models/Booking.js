"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User,{foreignKey:'patientID',targetKey:'id',as:"patientData"})
      Booking.belongsTo(models.Code,{foreignKey:'timeType',targetKey:'keyMap',as:"timeTypeDataPatient"})
    }
  }
  Booking.init(
    {
      statusID: DataTypes.STRING,
      docID: DataTypes.INTEGER,
      patientID: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
 
    }
  );
  return Booking;
};
