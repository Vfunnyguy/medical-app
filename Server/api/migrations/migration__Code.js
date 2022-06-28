'use strict';



module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Codes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, 
      keyMap:{
          type: Sequelize.STRING
      },
      type:{
          type: Sequelize.STRING
      },
      value_en:{
          type: Sequelize.STRING
      },
      value_vi:{
          type: Sequelize.STRING
      },
       createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Codes');
  }
};