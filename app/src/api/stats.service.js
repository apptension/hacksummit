import moment from 'moment';


export default ngInject(function StatsService(API) {
  const statsAPI = API.all('stats');

  this.getUserStats = (userId) => {
    return statsAPI.get(userId).then(parseUserStats);
  };

  function parseUserStats(data) {
    let stats = data.plain();


  }
});
