export default ngInject(function UserService(API) {
  const roleApi = API.all('role');

  this.getList = () => {
    return roleApi.getList();
  };

  this.get = (id) => {
    return roleApi.get(id);
  };

  this.getProfile = () => {
    return usersAPI.customGET('me');
  };

  this.getSuggestedEvaluation = () => {
    return usersAPI.customGET('evaluation');
  };
});
