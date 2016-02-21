import _ from 'lodash';
import moment from 'moment';

export default ngInject(function StatsService(API, $httpParamSerializerJQLike) {
  const statsAPI = API.all('stat');

  let parseParams = (params = null) => {
    let paramsParsed = '';

    if (params !== null) {
      paramsParsed = '?' + decodeURIComponent($httpParamSerializerJQLike(params));
    }

    return paramsParsed;
  };

  this.getContributors = () => {
    return statsAPI.customGET('contributors');
  };

  this.getList = (_params = null) => {
    let params = _.cloneDeep(_params);

    params.skill = _.map(params.skill, 'id');
    params.project = _.map(params.project, 'id');
    params.user = _.map(params.user, 'id');
    if (params.startDate) {
      params.startDate = moment(params.startDate).utc().format('X');
    }
    if (params.endDate) {
      params.endDate = moment(params.endDate).utc().format('X');
    }

    return statsAPI
      .customGET(parseParams(params))
      .then((data) => {
        return parseUserStats(data);
      });
  };

  this.getUserStats = (userId, params = null) => {
    return statsAPI
      .customGET(userId + parseParams(params))
      .then(parseUserStats);
  };

  function parseUserStats(data) {
    data.skills = _.map(data.skills, (skill) => {
      skill.scores = _.map(skill.scores, (skillsScore) => {
        skillsScore.scores = _.map(skillsScore.scores, (userScore) => {
          userScore.date = moment(userScore.date, 'X');
          userScore.value *= 100;
          return userScore;
        });
        return skillsScore;
      });
      return skill;
    });

    data.comments = _.map(data.comments, (comment) => {
      comment.comments = _.map(comment.comments, (userComment) => {
        userComment.comments = _.map(userComment.comments, (userScore) => {
          userScore.date = moment(userScore.date, 'X');
          return userScore;
        });
        return userComment;
      });
      return comment;
    });

    data.average = _.map(data.average, (skill) => {
      skill.scores = _.map(skill.scores, (score) => {
        score.date = moment(score.date, 'X');
        score.value *= 100;
        return score;
      });
      return skill;
    });

    return data;
  }
});
