'use strict';
module.exports = function(sequelize, DataTypes) {
  var skill = sequelize.define('skill', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isSoft: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.skill.belongsToMany(models.skillset, { through: models.skillSkillset });
        models.skill.hasMany(models.evaluation, { onDelete: 'CASCADE', foreignKey: { allowNull: false }});
      }
    }
  });
  return skill;
};
