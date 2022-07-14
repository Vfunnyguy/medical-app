module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn(
        'Bookings',
        'Token',
       Sequelize.STRING
      );
  
    },
  
    down: function(queryInterface, Sequelize) {
      // logic for reverting the changes
      return queryInterface.removeColumn(
        'Bookings',
        'Token'
      );
    }
  }