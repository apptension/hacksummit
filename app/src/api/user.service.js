export default ngInject(function UserService(API) {
  const usersAPIName = 'user';

  this.getList = () => {
    return API.all(usersAPIName).getList();
  };

  this.get = (id) => {
    return API.all(usersAPIName).get(id);
  };

  this.getProfile = () => {
    return API.all(usersAPIName).customGET('me');
  };

  this.getSuggestedEvaluation = () => {
    return API.all(usersAPIName).customGET('evaluation');
  };

  this.login = (userId) => {
    return API.all(usersAPIName).customPOST({userId}, 'login');
  };
});
