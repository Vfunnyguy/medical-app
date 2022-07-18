module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn(
        'DocInfos',
        'bank',
       Sequelize.STRING
      );
  
    },
  
    down: function(queryInterface, Sequelize) {
      // logic for reverting the changes
      return queryInterface.removeColumn(
        'DocInfos',
        'Token'
      );
    }
  }