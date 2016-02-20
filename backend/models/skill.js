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
        skill.belongsToMany(models.skillset, {
          through: 'skillsetSkill'
        });
        skill.belongsTo(models.evaluation, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return skill;
};
