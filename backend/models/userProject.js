'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserProject = sequelize.define('UserProject', {
  }, {
    tableName: 'userProjects',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserProject;
};
