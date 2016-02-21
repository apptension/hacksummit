'use strict';

let express = require('express'),
  router = express.Router(),
  models = require('../models');

router.get('/:id/evaluation', (req, res, next) => {
  return models.User.findById(parseInt(req.params.id)).then(function(user) {
    if (user) {
      return models.Evaluation.findOne({
        where: {
          EvaluatedUserId: req.params.id,
          date: {
            $gte: (new Date()).getTime() - 604800000 // date >= now() - 7 days
          }
        }
      }).then(function(lastEvaluation) {
        if (!lastEvaluation) {
          return models.Evaluation.findOne({
            where: {
              EvaluatedUserId: req.params.id,
              state: models.Evaluation.attributes.state.values.PENDING
            }
          }).then(function(evaluation) {
            if (evaluation) {
              return res.json(evaluation);
            } else {
              return res.status(204).json({});
            }
          });
        } else {
          return res.status(204).json({});
        }
      });
    } else {
      return res.status(404).json({ error: 'user not found' });
    }
  });
});

router.put('/:id/evaluation', (req, res, next) => {
  return models.User.findById(parseInt(req.params.id)).then(function(user) {
    if (user) {
      return models.Evaluation.findOne({
        where: {
          EvaluatedUserId: req.params.id,
          date: {
            $gte: (new Date()).getTime() - 604800000 // date >= now() - 7 days
          }
        }
      }).then(function(lastEvaluation) {
        if (!lastEvaluation) {
          return models.Evaluation.findOne({
            where: {
              id: req.body.evaluationId,
              EvaluatedUserId: req.params.id,
              state: models.Evaluation.attributes.state.values.PENDING
            }
          }).then(function(evaluation) {
            if (evaluation) {
              var state = models.Evaluation.attributes.state.values.PENDING, starred = 0;
              if ('state' in req.body && parseInt(req.body.state) === models.Evaluation.attributes.state.values.SKIPPED) {
                state = models.Evaluation.attributes.state.values.SKIPPED;
              } else if ('starred' in req.body) {
                state = models.Evaluation.attributes.state.values.ANSWERED;
                starred = parseInt(req.body.starred) === 1;
              }
              if (state !== models.Evaluation.attributes.state.values.PENDING) {
                return models.Evaluation.update({
                  starred: starred,
                  date: (new Date()).getTime(),
                  state: state
                }, {
                  where: {
                    id: evaluation.id
                  }
                }).then(function() {
                  return res.json({ success: true });
                });
              } else {
                return res.status(400).json({ error: 'incorrect post data', success: false });
              }
            } else {
              return res.status(404).json({ error: 'evaluation not found', success: false });
            }
          });
        } else {
          return res.status(204).json({});
        }
      });
    } else {
      return res.status(404).json({ error: 'user not found', success: false });
    }
  });
});

module.exports = router;
