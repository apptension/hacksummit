'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.createTable('userRoles', {
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
        roleId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'roles',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
          primaryKey: true
        }
      }).then(() => {
        return queryInterface.createTable('skillRoles', {
          userId: {
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
          roleId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'roles',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
            primaryKey: true
          }
        });
      });
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('userRoles').then(() => {
      return queryInterface.dropTable('skillRoles').then(() => {
        return queryInterface.dropTable('roles');
      })
    });
  }
};
