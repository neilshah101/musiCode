'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.addColumn('Collections', "firstName", {
            type: Sequelize.STRING
        })
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Collections', "firstName")
    }
};