'use strict';
module.exports = function(sequelize, DataTypes) {
  var project = sequelize.define('project', {
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
    classMethods: {
      associate: function(models) {
        project.belongsToMany(models.user, {
          through: 'userProjects'
        });
        project.hasMany(models.skillset);
        project.belongsTo(models.evaluation, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return project;
};
