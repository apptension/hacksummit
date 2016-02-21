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
    },

    averageQuery = {
      attributes: [
        [sequelize.fn('year', sequelize.col('date')), 'year'],
        [sequelize.fn('weekofyear', sequelize.col('date')), 'week'],
        [sequelize.fn('avg', sequelize.col('starred')), 'value'],
        'skillId'
      ],
      group: [
        sequelize.fn('year', sequelize.col('date')),
        sequelize.fn('weekofyear', sequelize.col('date')),
        'skillId'
      ],
      order: [
        sequelize.col('date')
      ]
    };


  if (users && users.length) {
    //query.attributes.push('userId');
    //query.group.push('userId');
    where.userId = users;
  }

  query.where = where;
  globalQuery.where = _.clone(where);
  commentsQuery.where = _.clone(where);
  commentsQuery.where.comment = {
    $ne: null
  };
  averageQuery.where = where;

  if (globalQuery.where.skillId) {
    globalQuery.include = [{
      model: models.Skill,
      where: {
        $and: {
          $or: [{
            id: globalQuery.where.skillId
          }, {
            isSoft: true
          }]
        }
      }
    }];
    delete globalQuery.where.skillId;
  }

  Promise.all([
    models.Evaluation.findAll(query),
    models.Evaluation.findAll(globalQuery),
    models.Evaluation.findAll(commentsQuery),
    models.Evaluation.findAll(averageQuery)
  ]).then((values) => {

    let result = values[0],
      globalStats = values[1],
      commentsData = values[2],
      averageData = values[3];

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

    let averageMapped = averageData.map((el) => {
      return {
        skillId: el.getDataValue('skillId'),
        value: el.getDataValue('value'),
        date: moment({year: el.getDataValue('year')}).add(parseInt(el.getDataValue('week')) - 1, 'weeks').format('X')
      };
    });

    let averageGrouped = _.values(_.groupBy(averageMapped, 'skillId')).map((skillStats) => {
      return {
        skillId: skillStats[0].skillId,
        scores: skillStats.map((userStats) => {
          return _.pick(userStats, ['date', 'value']);
        })
      }
    });

    res.json({
      skills: grouped,
      global: globalStats.map((stat) => {
        return {
          score: stat.getDataValue('value'),
          skillId: stat.getDataValue('skillId'),
          userId: stat.getDataValue('userId')
        };
      }),
      comments: commentsGrouped,
      average: averageGrouped
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
