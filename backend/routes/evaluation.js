'use strict';

let express = require('express'),
  router = express.Router(),
  models = require('../models');

router.get('/date/:date', (req, res, next) => {
  return models.Evaluation.findAll({
    where: {
      date: parseInt(req.params.date)
    }
  }).then(function(evaluations) {
    return res.json(evaluations);
  });
});

module.exports = router;
