'use strict';
module.exports = function(sequelize, DataTypes) {
  var skillset = sequelize.define('skillset', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return skillset;
};