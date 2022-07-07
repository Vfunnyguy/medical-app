"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Code.hasMany(models.User, {foreignKey:'positionID',as:'positionData'});
      Code.hasMany(models.User, {foreignKey:'gender',as:'genderData'});
      Code.hasMany(models.Schedule, {foreignKey:'timeType',as:'timeTypeData'});
    }
  }
  Code.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      value_en: DataTypes.STRING,
      value_vi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Code",
    }
  );
  return Code;
};
