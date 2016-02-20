'use strict';
module.exports = function(sequelize, DataTypes) {
  var Skillset = sequelize.define('Skillset', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      tableName: 'skillsets',
      associate: function(models) {
        // associations can be defined here
        models.Skillset.belongsToMany(models.Skill, { through: models.SkillSkillset });
        models.Skillset.belongsTo(models.Project, { onDelete: 'CASCADE', foreignKey: { allowNull: false }});
      }
    }
  });
  return Skillset;
};
