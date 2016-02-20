'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserRole = sequelize.define('UserRole', {
  }, {
    tableName: 'userRoles',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    getterMethods: {
      createdAt: function() {
        return Date.parse(this.getDataValue('createdAt'));
      },
      updatedAt: function() {
        return Date.parse(this.getDataValue('updatedAt'));
      }
    }
  });
  return UserRole;
};
