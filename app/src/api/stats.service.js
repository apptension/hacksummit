import moment from 'moment';

export default ngInject(function StatsService(MockAPI, $httpParamSerializerJQLike) {
  const statsMockAPI = MockAPI.all('stats');

  this.getUserStats = (userId, params = null) => {
    let paramsParsed = '';
    
    if (params !== null) {
      paramsParsed = $httpParamSerializerJQLike(params);
    }

    return statsMockAPI
      .get(userId + paramsParsed)
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
