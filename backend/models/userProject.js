'use strict';
module.exports = function(sequelize, DataTypes) {
  var userProject = sequelize.define('userProject', {
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userProject;
};
