'use strict';
module.exports = function(sequelize, DataTypes) {
  var Evaluation = sequelize.define('Evaluation', {
    starred: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      get: function () {
        return Date.parse(this.getDataValue('date'));
      },
      set: function (value) {
        var _date = new Date(value);
        this.setDataValue('date', _date.toISOString().substr(0, 10));
      }
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
    tableName: 'evaluations',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Evaluation.belongsTo(models.Project, { onDelete: 'CASCADE', foreignKey: { allowNull: false } });
        models.Evaluation.belongsTo(models.User, { as: 'EvaluatedUser', onDelete: 'CASCADE', foreignKey: { allowNull: false } });
        models.Evaluation.belongsTo(models.User, { onDelete: 'CASCADE', foreignKey: { allowNull: false } });
        models.Evaluation.belongsTo(models.Skill, {
          onDelEte: 'CASCADE',
          foreignKey: { allowNull: false }
        })
      }
    }
  });
  return Evaluation;
};
