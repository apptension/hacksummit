'use strict';
module.exports = function(sequelize, DataTypes) {
  var SkillRole = sequelize.define('SkillRole', {
  }, {
    tableName: 'skillRoles',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SkillRole;
};
