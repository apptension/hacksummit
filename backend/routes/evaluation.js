'use strict';

let express = require('express'),
  router = express.Router(),
  models = require('../models');

router.get('/date/:date', (req, res, next) => {
  return models.Evaluation.findAll({
    where: {
      date: (new Date(parseInt(req.params.date))).toISOString().substr(0, 10),
      state: models.Evaluation.attributes.state.values.ANSWERED
    }
  }).then(function(evaluations) {
    return res.json(evaluations);
  });
});

module.exports = router;
