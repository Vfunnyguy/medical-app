module.exports={
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type:Sequelize.BLOB('long'),
                allowNul:true,
            })
        ])
    },
    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type:Sequelize.STRING,
                allowNul:true,
            })
        ])
    }
}