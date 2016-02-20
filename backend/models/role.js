'use strict';
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {
    tableName: 'roles',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Role.belongsToMany(models.User, { through: models.UserRole});
        Role.belongsToMany(models.Skill, { through: models.SkillRole});
      }
    }
  });
  return Role;
};
