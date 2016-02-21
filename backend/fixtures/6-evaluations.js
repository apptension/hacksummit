'use strict';

let _ = require('lodash'),
  models = [],
  dateFrom = (new Date(2016, 1, 1, 0, 0, 0)).getTime(),
  dateTo = (new Date(2016, 3, 24, 0, 0, 0)).getTime(),
  comments = [
    null,
    'Phasellus iaculis massa et placerat luctus.',
    'Mauris commodo leo sit amet nisi venenatis, et maximus tellus dignissim.',
    'Aenean vitae leo eu leo elementum interdum interdum eget orci.',
    'Vestibulum eget lacus a massa dictum maximus vel et lacus.',
    'Aenean sollicitudin tortor ut mi venenatis, eget commodo augue porttitor.',
    'Phasellus convallis est vitae tristique condimentum.',
    'Integer volutpat odio non diam hendrerit, eu posuere sem placerat.',
    'Nunc consectetur libero id dapibus vulputate.',
    'Phasellus eleifend lacus non eros pulvinar venenatis.',
    'Donec a magna eget elit ullamcorper auctor.'
  ];

_.times(3000, (id) => {
  models.push({
    model: "Evaluation",
    keys: ["id"],
    data: {
      id: id,
      starred: Math.random() >= 0.5 ? 1 : 0,
      state: _.random(0, 2),
      comment: comments[_.random(0, 10)],
      date: dateFrom + Math.random() * (dateTo - dateFrom),
      ProjectId: _.random(1, 5),
      EvaluatedUserId: _.random(1, 2),
      UserId: _.random(2, 5),
      SkillId: _.random(1, 38)
    }
  });
});

module.exports = models;
