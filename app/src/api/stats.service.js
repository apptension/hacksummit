import moment from 'moment';


export default ngInject(function StatsService(API) {
  const statsAPI = API.all('stats');

  this.getUserStats = (userId) => {
    return statsAPI.get(userId).then(parseUserStats);
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
