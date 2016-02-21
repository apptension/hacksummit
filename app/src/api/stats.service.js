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
          userScore.date = moment.utc(parseInt(userScore.date, 10) * 1000);
          userScore.value *= 100;
          return userScore;
        });
        return skillsScore;
      });
      return skill;
    });

    return data;
  }
});
