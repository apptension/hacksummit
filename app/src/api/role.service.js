export default ngInject(function RoleService(API) {
  const roleApi = API.all('role');

  this.getList = () => {
    return roleApi.getList();
  };

  this.get = (id) => {
    return roleApi.get(id);
  };
});
