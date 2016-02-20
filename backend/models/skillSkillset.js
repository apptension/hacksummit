'use strict';
module.exports = function(sequelize, DataTypes) {
  var skillSkillset = sequelize.define('skillSkillset', {
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return skillSkillset;
};
