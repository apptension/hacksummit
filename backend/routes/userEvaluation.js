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
          state: models.Evaluation.attributes.state.values.PENDING
        }
      }).then(function(lastEvaluation) {
        if (!lastEvaluation) {
          return models.sequelize.query('select skills.id, userprojects.ProjectId, evaluations.id evaluate from (skills, skillskillsets, skillsets, userprojects) left join evaluations on (evaluations.SkillId=skills.id and evaluations.EvaluatedUserId=? and (evaluations.date is null or evaluations.date>=date_sub(now(), interval 7 day))) where skills.id=skillskillsets.SkillId and skillskillsets.SkillsetId=skillsets.id and skillsets.ProjectId=userprojects.ProjectId and userprojects.UserId=? having evaluate is null', {replacements: [req.params.id, req.params.id], type: models.sequelize.QueryTypes.SELECT}).then(function(skills) {
            if (skills.length) {
              var skill = skills[Math.floor(Math.random() * (skills.length - 1))];
              return models.User.findAll({
                where: {
                  isAdmin: 1
                }
              }).then(function(users) {
                var user = users[Math.floor(Math.random() * (users.length - 1))];
                return models.Evaluation.upsert({
                  ProjectId: skill.ProjectId,
                  EvaluatedUserId: req.params.id,
                  UserId: user.id,
                  SkillId: skill.id
                }).then(function() {
                  return models.Evaluation.findOne({
                    where: {
                      EvaluatedUserId: req.params.id,
                      state: models.Evaluation.attributes.state.values.PENDING
                    }
                  }).then(function(evaluation) {
                    return res.json(evaluation);
                  });
                });
              });
            } else {
              return res.status(204).json({});
            }
          });
        } else {
          return res.json(lastEvaluation);
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
              state: state,
              comment: req.body.comment
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
      return res.status(404).json({ error: 'user not found', success: false });
    }
  });
});

module.exports = router;
