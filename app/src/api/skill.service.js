export default ngInject(function StatsService(API) {
  const statsMockAPI = API.all('skill');

  this.getList = () => {
    return statsMockAPI.getList();
  };
});
