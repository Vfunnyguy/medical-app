module.exports={
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('markdown', 'htmlContent', {
                type:Sequelize.TEXT('long'),
                allowNul:true,
            }),
            queryInterface.changeColumn('markdown', 'markDownContent', {
                type:Sequelize.TEXT('long'),
                allowNul:true,
            })
        ])
    },
    down: async (queryInterface, Sequelize) => {
        return Promise.all([
             queryInterface.changeColumn('markdown', 'htmlContent', {
                type:Sequelize.TEXT('long'),
                allowNul:true,
            }),
            queryInterface.changeColumn('markdown', 'markDownContent', {
                type:Sequelize.TEXT('long'),
                allowNul:true,
            })
        ])
    }
}