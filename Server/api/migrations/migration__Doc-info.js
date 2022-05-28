'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DocInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      docID: {
        type: Sequelize.INTEGER
      },
      priceID: {
        type: Sequelize.STRING
      },
      provinceID: {
        type: Sequelize.STRING
      },
      paymentID: {
        type: Sequelize.STRING
      },
      addressClinic: {
        type: Sequelize.STRING
      },
      nameClinic:{
        type:Sequelize.STRING
      },
      note:{
        type:Sequelize.STRING
      },
      count:{
        type:Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DocInfos');
  }
};