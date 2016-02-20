'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        user.belongsToMany(models.project, {
          through: 'userProjects'
        });
        user.belongsTo(models.evaluation, {
          foreignKey: {
            allowNull: false
          }
        });
        user.belongsTo(models.evaluation, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return user;
};
