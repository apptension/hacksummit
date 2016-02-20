'use strict';
module.exports = function(sequelize, DataTypes) {
  var skillset = sequelize.define('skillset', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.skillset.belongsToMany(models.skill, { through: models.skillSkillset });
        models.skillset.belongsTo(models.project, { onDelete: 'CASCADE', foreignKey: { allowNull: false }});
      }
    }
  });
  return skillset;
};
