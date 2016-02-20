export default ngInject(function UserService(API) {
  const userAPI = API.all('user');

  this.getList = () => {
    return userAPI.getList();
  };

  this.get = (id) => {
    return userAPI.get(id);
  };

  this.getProfile = () => {
    return userAPI.customGET('me');
  };

  this.getSuggestedEvaluation = () => {
    return userAPI.customGET('evaluation');
  };
});
