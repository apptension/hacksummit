export default ngInject(function StatsService(API) {
  const api = API.all('skill');

  this.get = (id) => {
    return api.get(id);
  };

  this.getList = () => {
    return api.getList();
  };

  this.post = (obj) => {
    return api.post(obj);
  };
});
