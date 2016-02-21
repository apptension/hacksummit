'use strict';

let express = require('express'),
  moment = require('moment'),
  router = express.Router(),
  models = require('../models'),
  _ = require('lodash');

router.get('/', (req, res, next) => {

  let sequelize = models.sequelize,
    where = {},
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
      ]
    };

  if (users && users.length) {
    //query.attributes.push('userId');
    //query.group.push('userId');
    where.userId = users;
  }

  query.where = where;

  models.Evaluation.findAll(query).then(function (result) {


    var mapped = result.map((el) => {
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

    res.json({
      skills: grouped
    });
  });

});

module.exports = router;
