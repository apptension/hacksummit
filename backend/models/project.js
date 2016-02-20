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
        // associations can be defined here
        models.project.belongsToMany(models.user, { through: models.userProject });
        models.project.hasMany(models.evaluation, { onDelete: 'CASCADE', foreignKey: { allowNull: false }});
      }
    }
  });
  return project;
};
