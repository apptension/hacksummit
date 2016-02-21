'use strict';
var moment = require('moment');
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
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
    },
    getterMethods: {
      startDate: function() {
        return Date.parse(this.getDataValue('startDate'));
      },
      endDate: function() {
        return Date.parse(this.getDataValue('endDate'));
      },
      createdAt: function() {
        return Date.parse(this.getDataValue('createdAt'));
      },
      updatedAt: function() {
        return Date.parse(this.getDataValue('updatedAt'));
      }
    },
    setterMethods: {
      startDate: function(value) {
        var _date = moment(value, 'x');
        this.setDataValue('startDate', _date.format('YYYY-MM-DD HH:mm:ss'));
      },
      endDate: function(value) {
        var _date = moment(value, 'x');
        this.setDataValue('endDate', _date.format('YYYY-MM-DD HH:mm:ss'));
      }
    }
  });
  return Project;
};
