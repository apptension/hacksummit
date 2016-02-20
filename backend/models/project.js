'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      get: function () {
        return Date.parse(this.getDataValue('startDate'));
      },
      set: function (value) {
        var _date = new Date(value);
        this.setDataValue('startDate', _date.toISOString().substr(0, 10));
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      get: function () {
        return Date.parse(this.getDataValue('endDate'));
      },
      set: function (value) {
        var _date = new Date(value);
        this.setDataValue('endDate', _date.toISOString().substr(0, 10));
      }
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
