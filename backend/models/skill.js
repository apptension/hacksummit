'use strict';
module.exports = function(sequelize, DataTypes) {
  var Skill = sequelize.define('Skill', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isSoft: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'skills',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Skill.belongsToMany(models.Skillset, { through: models.SkillSkillset });
        Skill.belongsToMany(models.Role, { through: models.SkillRole });
        models.Skill.hasMany(models.Evaluation, { onDelete: 'CASCADE', foreignKey: { allowNull: false }});
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
  return Skill;
};
