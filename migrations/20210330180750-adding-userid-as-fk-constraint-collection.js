'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.addConstraint('Collections', {
            fields: ['userId'],
            type: 'FOREIGN KEY',
            name: 'userid-fk-in-collections',
            references: {
                table: 'Users',
                field: 'id'
            }
        })

    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('Collections', 'userid-fx-in-collections')
    }
}