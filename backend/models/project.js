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
        var _date = new Date(parseInt(value));
        this.setDataValue('startDate', _date.toISOString().substr(0, 10));
      },
      endDate: function(value) {
        var _date = new Date(parseInt(value));
        this.setDataValue('endDate', _date.toISOString().substr(0, 10));
      }
    }
  });
  return Project;
};
