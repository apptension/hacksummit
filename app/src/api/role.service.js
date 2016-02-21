export default ngInject(function RoleService(API) {
  const roleApi = API.all('role');

  this.getList = () => {
    return [
      {
        name: 'frontend',
        id: 1,
        skills: [
          {
            name: 'javascript',
            id: 1
          },
          {
            name: 'css',
            id: 2
          }
        ]
      },
      {
        name: 'backend',
        id: 2,
        skills: [
          {
            name: 'php',
            id: 3
          },
          {
            name: 'aws configuration',
            id: 2
          }
        ]
      }
    ];
    //return roleApi.getList();
  };

  this.get = (id) => {
    return roleApi.get(id);
  };
});
