'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'projects',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Project.belongsToMany(models.User, { through: models.UserProject });
        models.Project.hasMany(models.Evaluation, { onDelete: 'CASCADE', foreignKey: { allowNull: false }});
        models.Project.hasMany(models.Skillset, { onDelete: 'CASCADE', foreignKey: { allowNull: false }});
      }
    }
  });
  return Project;
};
