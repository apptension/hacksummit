'use strict';

let express = require('express'),
  moment = require('moment'),
  router = express.Router(),
  models = require('../models'),
  _ = require('lodash');

router.get('/', (req, res, next) => {

  let sequelize = models.sequelize,
    where = {
      state: 1 // ANSWERED only
    },
    projects = req.query.project,
    startDate = req.query.startDate,
    endDate = req.query.endDate,
    skills = req.query.skill,
    users = req.query.user;

  if (projects && projects.length > 0) {
    where.projectId = projects;
  }

  if (skills && skills.length > 0) {
    where.skillId = skills;
  }

  if (startDate) {
    where.date = {
      $gte: moment(new Date(parseInt(startDate) * 1000)).format('YYYY-MM-DD HH:mm:ss')
    };
  }

  if (endDate) {
    where.date = where.date || {};
    where.date.$lte = moment(new Date(parseInt(endDate) * 1000)).format('YYYY-MM-DD HH:mm:ss');
  }

  let query = {
      attributes: [
        [sequelize.fn('year', sequelize.col('date')), 'year'],
        [sequelize.fn('weekofyear', sequelize.col('date')), 'week'],
        [sequelize.fn('avg', sequelize.col('starred')), 'value'],
        'skillId',
        'userId'
      ],
      group: [
        sequelize.fn('year', sequelize.col('date')),
        sequelize.fn('weekofyear', sequelize.col('date')),
        'skillId',
        'userId'
      ],
      order: [
        sequelize.col('date')
      ]
    },

    globalQuery = {
      attributes: [
        [sequelize.fn('avg', sequelize.col('starred')), 'value'],
        'skillId',
        'userId'
      ],
      group: [
        'skillId',
        'userId'
      ]
    },

    commentsQuery = {
      attributes: [
        [sequelize.fn('year', sequelize.col('date')), 'year'],
        [sequelize.fn('weekofyear', sequelize.col('date')), 'week'],
        'skillId',
        'userId',
        'comment'
      ]
    };


  if (users && users.length) {
    //query.attributes.push('userId');
    //query.group.push('userId');
    where.userId = users;
  }

  query.where = where;
  globalQuery.where = where;
  commentsQuery.where = _.clone(where);
  commentsQuery.where.comment = {
    $ne: null
  };

  let global = models.Evaluation.findAll(globalQuery),
    commentsQ = models.Evaluation.findAll(commentsQuery);

  models.Evaluation.findAll(query).then((result) => {
    commentsQ.then((commentsData) => {

      let mapped = result.map((el) => {
        return {
          userId: el.getDataValue('userId'),
          skillId: el.getDataValue('skillId'),
          value: el.getDataValue('value'),
          date: moment({year: el.getDataValue('year')}).add(parseInt(el.getDataValue('week')) - 1, 'weeks').format('X')
        };
      });

      let grouped = _.values(_.groupBy(mapped, 'skillId')).map((skillStats) => {
        return {
          skillId: skillStats[0].skillId,
          scores: _.values(_.groupBy(skillStats, 'userId')).map((userStats) => {
            return {
              userId: userStats[0].userId,
              scores: userStats.map((s) => {
                return _.pick(s, ['date', 'value']);
              })
            }
          })
        }
      });

      let commentsMapped = commentsData.map((el) => {
        return {
          userId: el.getDataValue('userId'),
          skillId: el.getDataValue('skillId'),
          comment: el.getDataValue('comment'),
          date: moment({year: el.getDataValue('year')}).add(parseInt(el.getDataValue('week')) - 1, 'weeks').format('X')
        };
      });

      let commentsGrouped = _.values(_.groupBy(commentsMapped, 'skillId')).map((skillStats) => {
        return {
          skillId: skillStats[0].skillId,
          comments: _.values(_.groupBy(skillStats, 'userId')).map((userStats) => {
            return {
              userId: userStats[0].userId,
              comments: userStats.map((s) => {
                return _.pick(s, ['date', 'comment']);
              })
            }
          })
        }
      });

      global.then((globalStats) => {
        res.json({
          skills: grouped,
          global: globalStats.map((stat) => {
            return {
              score: stat.getDataValue('value'),
              skillId: stat.getDataValue('skillId'),
              userId: stat.getDataValue('userId')
            };
          }),
          comments: commentsGrouped
        });
      });
    });
  });

});

router.get('/contributors', (req, res, next) => {
  let sequelize = models.sequelize;

  let query = {
    include: [{
      model: models.User
    }],
    attributes: [
      [sequelize.fn('count', 'id'), 'score'],
      'userId'
    ],
    group: [
      'userId'
    ],
    order: [[sequelize.col('score'), 'DESC']],
    where: {
      date: {
        $and: {
          $gte: moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
          $lte: moment().format('YYYY-MM-DD HH:mm:ss')
        }
      },
      state: 1
    },
    limit: 3
  };

  models.Evaluation.findAll(query).then((result) => {
    res.json(result.map((userData) => {
      return {
        score: userData.getDataValue('score'),
        userId: userData.getDataValue('userId'),
        User: userData.getDataValue('User')
      };
    }));
  });

});

module.exports = router;
