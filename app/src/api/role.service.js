export default ngInject(function RoleService(API) {
  const roleApi = API.all('role');

  this.getList = () => {
    return roleApi.getList().then(parseRoles);
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

  function parseRoles(data) {
    let roles = data.plain();
    return roles;
  }
});
