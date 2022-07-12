module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('DocInfos', 'priceID', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('DocInfos', 'priceID', {
                type: Sequelize.STRING,
                allowNull: true,
            }
            )
        ])
    }
};