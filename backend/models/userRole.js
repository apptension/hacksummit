'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserRole = sequelize.define('UserRole', {
  }, {
    tableName: 'userRoles',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserRole;
};
