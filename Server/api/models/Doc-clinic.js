"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DocClinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DocClinic.init(
    {
      docID: DataTypes.INTEGER,
      clinicID: DataTypes.INTEGER,
      specID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DocClinic",
    }
  );
  return DocClinic;
};
