export default ngInject(function ProjectService(API) {
  const projectsAPI = API.all('project');

  this.getList = () => {
    return projectsAPI.getList().then((projects) => {
      return projects.plain();
    });
  };

  this.get = (id) => {
    return projectsAPI.get(id);
  };
});
