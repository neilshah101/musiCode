'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Posts', {
      fields: ['userId'],
      type: 'FOREIGN KEY',
      name: 'userid-fk-in-posts',
      references: {
        table: 'Users',
        field: 'id'
      }
    }
  )    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Posts', 'userid-fx-in-posts')    
  }
};
