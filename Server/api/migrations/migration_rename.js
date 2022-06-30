module.exports={
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameTable('markdown', 'markdowns'),
    
        ])
    },
    down: async (queryInterface, Sequelize) => {
        return Promise.all([
           queryInterface.renameTable('markdown', 'markdowns'),
        ])
    }
}