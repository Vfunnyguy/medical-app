module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('DocInfos', 'priceID', {
                type: Sequelize.INTEGER,
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('DocInfos', 'priceID', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }
            )
        ])
    }
};