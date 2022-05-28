"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email:'admin@ad.com',
        password:'123456',
        fullName: "admin",
        address:'Ma Thiên Nhai',
        gender:1,
        phoneNumber:'098765432',
        positionID:'admin',
        image:'this is image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};