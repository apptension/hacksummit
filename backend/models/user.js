'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'users',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsToMany(models.Project, { through: models.UserProject });
        User.belongsToMany(models.Role, { through: models.UserRole });
        User.hasMany(models.Evaluation, {
          foreignKey: {
            allowNull: false
          }
        });
        User.hasMany(models.Evaluation, {
          foreignKey: {
            allowNull: false
          },
          as: 'EvaluatedUser'
        });
      }
    },
    getterMethods: {
      createdAt: function() {
        return Date.parse(this.getDataValue('createdAt'));
      },
      updatedAt: function() {
        return Date.parse(this.getDataValue('updatedAt'));
      }
    }
  });
  return User;
};
