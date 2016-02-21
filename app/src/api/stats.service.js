import moment from 'moment';

export default ngInject(function StatsService(API, MockAPI, $httpParamSerializerJQLike) {
  const statsMockAPI = MockAPI.all('stats');
  const statsAPI = API.all('stat');

  let parseParams = (params = null) => {
    let paramsParsed = '';

    if (params !== null) {
      paramsParsed = '?' + $httpParamSerializerJQLike(params);
    }

    return paramsParsed;
  };

  this.getContributors = () => {
    return statsAPI.customGET('contributors');
  };

  this.getList = (params = null) => {
    return statsMockAPI
      .customGET(parseParams(params))
      .then((data) => {
        return data.map(parseUserStats);
      });
  };

  this.getUserStats = (userId, params = null) => {
    return statsMockAPI
      .customGET(userId + parseParams(params))
      .then(parseUserStats);
  };

  function parseUserStats(data) {
    data.skills = _.map(data.skills, (skill) => {
      skill.scores = _.map(skill.scores, (score) => {
        score.date = moment.utc(score.date);
        return score;
      });
      return skill;
    });

    return data;
  }
});
