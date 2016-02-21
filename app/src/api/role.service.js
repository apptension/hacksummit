export default ngInject(function RoleService(API) {
  const roleApi = API.all('role');

  this.getList = () => {
    return roleApi.getList();
  };

  this.get = (id) => {
    return roleApi.get(id);
  };

  this.put = (role) => {
    role.put();
  };

  this.post = (role) => {
    roleApi.post(role);
  };

  this.delete = (role) => {
    console.log(role);
    role.remove();
  };
});
