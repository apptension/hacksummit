'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserProject = sequelize.define('UserProject', {
  }, {
    tableName: 'userProjects',
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
  return UserProject;
};
