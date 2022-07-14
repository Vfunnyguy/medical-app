"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MarkDown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MarkDown.belongsTo(models.User, {foreignKey:'docID'})
    }
  }
  MarkDown.init(
    {
      docID: DataTypes.INTEGER,
      clinicID: DataTypes.INTEGER,
      specID: DataTypes.INTEGER,
      htmlContent: DataTypes.TEXT,
      markDownContent: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "MarkDown",
    }
  );
  return MarkDown;
};
