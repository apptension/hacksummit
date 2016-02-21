'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('evaluations', 'date', {
      allowNull: true,
      type: Sequelize.DATEONLY
    }).then(() => {
      return queryInterface.changeColumn('projects', 'startDate', {
        allowNull: false,
        type: Sequelize.DATEONLY
      }).then(() => {
        return queryInterface.changeColumn('projects', 'endDate', {
          allowNull: false,
          type: Sequelize.DATEONLY
        });
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('evaluations', 'date', {
      allowNull: true,
      type: Sequelize.DATE
    }).then(() => {
      return queryInterface.changeColumn('projects', 'startDate', {
        allowNull: false,
        type: Sequelize.DATE
      }).then(() => {
        return queryInterface.changeColumn('projects', 'endDate', {
          allowNull: false,
          type: Sequelize.DATE
        });
      });
    });
  }
};
