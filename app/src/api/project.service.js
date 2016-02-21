export default ngInject(function ProjectService(MockAPI) {
  const projectsMockAPI = MockAPI.all('project');

  this.getList = () => {
    return projectsMockAPI.getList().then((projects) => {
      return projects;
    });
  };

  this.get = (id) => {
    return projectsMockAPI.get(id);
  };
});
