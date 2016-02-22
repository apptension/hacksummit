'use strict';

let _ = require('lodash'),
  faker = require('faker'),
  models = [],
  dateFrom = (new Date(2016, 1, 1, 0, 0, 0)).getTime(),
  dateTo = (new Date(2016, 3, 24, 0, 0, 0)).getTime();

_.times(3000, (id) => {
  models.push({
    model: "Evaluation",
    keys: ["id"],
    data: {
      id: id,
      starred: Math.random() >= 0.5 ? 1 : 0,
      state: _.random(0, 2),
      comment: Math.random() >= 0.5 ? faker.lorem.sentence() : null,
      date: dateFrom + Math.random() * (dateTo - dateFrom),
      ProjectId: _.random(1, 5),
      EvaluatedUserId: _.random(1, 2),
      UserId: _.random(2, 5),
      SkillId: _.random(1, 31)
    }
  });
});

module.exports = models;
