'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('evaluations', 'starred', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    }).then(() => {
      return queryInterface.changeColumn('evaluations', 'date', {
        allowNull: true,
        type: Sequelize.DATE
      }).then(() => {
        return queryInterface.changeColumn('evaluations', 'state', {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 0
        });
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('evaluations', 'starred', {
      allowNull: false,
      type: Sequelize.BOOLEAN
    }).then(() => {
      return queryInterface.changeColumn('evaluations', 'date', {
        allowNull: false,
        type: Sequelize.DATE
      }).then(() => {
        return queryInterface.changeColumn('evaluations', 'state', {
          allowNull: false,
          type: Sequelize.INTEGER
        });
      });
    });
  }
};
