'use strict';

let _ = require('lodash'),
  models = [],
  dateFrom = (new Date(2015, 1, 1, 9, 0, 0)).getTime(),
  dateTo = (new Date()).getTime();

_.times(3000, (id) => {
  models.push({
    model: "Evaluation",
    keys: ["id"],
    data: {
      id: id,
      starred: Math.random() >= 0.5 ? 1 : 0,
      state: _.random(0, 2),
      comment: null,
      date: dateFrom + Math.random() * (dateTo - dateFrom),
      ProjectId: _.random(1, 5),
      EvaluatedUserId: _.random(1, 2),
      UserId: _.random(2, 5),
      SkillId: _.random(1, 38)
    }
  });
});

module.exports = models;
