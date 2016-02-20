export default ngInject(function StatsService(MockAPI) {
  const statsMockAPI = MockAPI.all('skill');

  this.getList = () => {
    return statsMockAPI.getList();
  };
});
