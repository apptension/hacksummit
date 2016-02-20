'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    //return queryInterface.addColumn('evaluations', 'projectId', {
    //  type: Sequelize.INTEGER,
    //  reference: {
    //    model: 'projects',
    //    key: 'id'
    //  },
    //  onUpdate: 'CASCADE',
    //  onDelete: 'CASCADE',
    //  allowNull: false
    //}).then(() => {
    //  return queryInterface.addColumn('evaluations', 'EvaluatedUserId', {
    //    type: Sequelize.INTEGER,
    //    reference: {
    //      model: 'users',
    //      key: 'id'
    //    },
    //    onUpdate: 'CASCADE',
    //    onDelete: 'CASCADE',
    //    allowNull: false
    //}).then(() => {
    //    return queryInterface.addColumn('evaluations', 'userId', {
    //      type: Sequelize.INTEGER,
    //      reference: {
    //        model: 'users',
    //        key: 'id'
    //      },
    //      onUpdate: 'CASCADE',
    //      onDelete: 'CASCADE',
    //      allowNull: false
    //    }).then(() => {
          return queryInterface.createTable('skillSkillsets', {
            skillId: {
              type: Sequelize.INTEGER,
              references: {
                model: 'skills',
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
              allowNull: false,
              primaryKey: true
            },
            skillsetId: {
              type: Sequelize.INTEGER,
              references: {
                model: 'skillsets',
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
              allowNull: false,
              primaryKey: true
            }
          }).then(() => {
            return queryInterface.createTable('userProjects', {
              userId: {
                type: Sequelize.INTEGER,
                references: {
                  model: 'users',
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
                primaryKey: true
              },
              projectId: {
                type: Sequelize.INTEGER,
                references: {
                  model: 'projects',
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
                primaryKey: true
              }
            });
          });
        //});
      //})
    //});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    //return queryInterface.removeColumn('evaluations', 'projectId').then(() => {
    //  return queryInterface.removeColumn('evaluations', 'EvaluatedUserId').then(() => {
    //    return queryInterface.removeColumn('evaluations', 'userId').then(() => {
          return queryInterface.dropTable('skillSkillsets').then(() => {
            return queryInterface.dropTable('userProjects');
          //})
        //});
      //});
    });
  }
};
