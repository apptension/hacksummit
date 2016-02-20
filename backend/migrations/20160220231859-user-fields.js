'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('users', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    }).then(() => {
      return queryInterface.addColumn('users', 'avatar', {
        type: Sequelize.STRING,
        allowNull: false
      });
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('users', 'name').then(() => {
      return queryInterface.removeColumn('users', 'avatar');
    });
  }
};
