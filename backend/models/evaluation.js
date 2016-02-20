'use strict';
module.exports = function(sequelize, DataTypes) {
  var evaluation = sequelize.define('evaluation', {
    starred: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return evaluation;
};
