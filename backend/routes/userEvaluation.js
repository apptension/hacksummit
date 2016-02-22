'use strict';

let express = require('express'),
  router = express.Router(),
  models = require('../models');

router.get('/:id/evaluation', (req, res, next) => {
  return models.User.findById(parseInt(req.params.id)).then(function(user) {
    if (user) {
      return models.Evaluation.findOne({
        where: {
          userId: req.params.id,
          state: models.Evaluation.attributes.state.values.PENDING
        }
      }).then(function(lastEvaluation) {
        if (!lastEvaluation) {

          return models.sequelize.query('select s.id as skillId, u.id as userId, p.id as projectId from users u \
          left join userProjects up on u.id = up.userid \
          left join projects p on up.projectid = p.id \
          left join userRoles ur on ur.userId = u.id \
          left join roles r on r.id = ur.roleId \
          left join skillRoles sr on sr.roleId = r.id \
          left join skills s on s.id = sr.skillId \
          where u.isAdmin = 0 and u.id != ? and u.id NOT IN ( \
            select distinct EvaluatedUserId from evaluations e where userId = ? and e.date>=date_sub(now(), interval 1 day) \
          ) \
          order by rand() \
          limit 1', {replacements: [req.params.id, req.params.id], type: models.sequelize.QueryTypes.SELECT}).then(function(result) {

            if (result.length) {
              console.log('result', result, {
                UserId: req.params.id,
                EvaluatedUserId: result.userId,
                SkillId: result.skillId,
                ProjectId: result.projectId
              });
              return models.Evaluation.upsert({
                UserId: req.params.id,
                EvaluatedUserId: result[0].userId,
                SkillId: result[0].skillId,
                ProjectId: result[0].projectId
              }).then(function() {
                return models.Evaluation.findOne({
                  where: {
                    UserId: req.params.id,
                    state: models.Evaluation.attributes.state.values.PENDING
                  }
                }).then(function(evaluation) {
                  return res.json(evaluation);
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
          userId: req.params.id,
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
