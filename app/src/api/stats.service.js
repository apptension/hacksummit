import moment from 'moment';

export default ngInject(function StatsService(MockAPI, $httpParamSerializerJQLike) {
  const statsMockAPI = MockAPI.all('stats');

  let parseParams = () => {
    let paramsParsed = '';

    if (params !== null) {
      paramsParsed = $httpParamSerializerJQLike(params);
    }
    
    return paramsParsed;
  };

  this.getContributors = () => {
    return statsMockAPI.customGET('contributors');
  };

  this.getList = (params = null) => {
    statsMockAPI.getList(parseParams(params));
  };

  this.getUserStats = (userId, params = null) => {
    return statsMockAPI
      .get(userId + parseParams(params))
      .then(parseUserStats);
  };

  function parseUserStats(data) {
    let stats = data.plain();

    stats.skills = _.map(stats.skills, (skill) => {
      skill.scores = _.map(skill.scores, (score) => {
        score.date = moment.utc(score.date);
        return score;
      });
      return skill;
    });

    return stats;
  }
});
