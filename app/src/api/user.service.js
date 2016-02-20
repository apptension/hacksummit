export default ngInject(function UserService(API) {
  const usersAPI = API.all('user');

  this.getList = () => {
    return usersAPI.getList();
  };
});
