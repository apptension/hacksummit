'use strict';
module.exports = function(sequelize, DataTypes) {
  var evaluation = sequelize.define('evaluation', {
    starred: DataTypes.BOOL,
    date: DataTypes.DATE,
    state: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return evaluation;
};