export default ngInject(function UserService(API) {
  const usersAPI = API.all('user');

  this.getList = () => {
    return usersAPI.getList();
  };

  this.get = (id) => {
    return usersAPI.get(id);
  };

  this.getProfile = () => {
    return usersAPI.customGET('me');
  };

  this.getSuggestedEvaluation = () => {
    return usersAPI.customGET('evaluation');
  };
});
