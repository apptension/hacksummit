export default ngInject(function ProjectService(API) {
  const projectsAPI = API.all('project');

  this.getList = () => {
    return projectsAPI.getList();
  };

  this.get = (id) => {
    return projectsAPI.get(id);
  };
});
