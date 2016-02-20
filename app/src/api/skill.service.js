export default ngInject(function StatsService(API) {
  const statsAPI = API.all('skill');

  this.getList = () => {
    return statsAPI.getList();
  };
});
