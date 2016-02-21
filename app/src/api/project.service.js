import moment from 'moment';

export default ngInject(function ProjectService(API) {
  const projectsMockAPI = MockAPI.all('project');

  this.getList = () => {
    return projectsMockAPI.getList().then(parseProject);
  };

  this.get = (id) => {
    return projectsMockAPI.get(id);
  };

  function parseProject(data) {
    let projects = data.plain();

    projects.map((project) => {
      project.startDate = moment.utc(project.startDate);
      project.endDate = moment.utc(project.endDate);
      return project;
    });

    return projects;
  }
});
