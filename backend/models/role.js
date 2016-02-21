'use strict';
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'roles',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Role.belongsToMany(models.User, { through: models.UserRole});
        Role.belongsToMany(models.Skill, { through: models.SkillRole});
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
  return Role;
};
