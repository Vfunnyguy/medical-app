module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.renameColumn(
        'Bookings',
        'Token',
        'token',
       Sequelize.STRING
      );
  
    }
  
   
  }