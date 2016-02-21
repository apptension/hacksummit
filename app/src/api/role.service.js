export default ngInject(function RoleService(API) {
  const roleApi = API.all('role');

  this.getList = () => {
    return roleApi.getList().then(parseRoles);
  };

  this.get = (id) => {
    return roleApi.get(id);
  };

  this.put = (role) => {
    return roleApi.customPUT(role, role.id);
  };

  this.post = (role) => {
    return roleApi.post(role);
  };

  this.delete = (role) => {
    return roleApi.customDELETE(role.id);
  };

  function parseRoles(data) {
    let roles = data.plain();
    return roles;
  }
});
