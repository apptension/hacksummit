import moment from 'moment';

export default ngInject(function ProjectService(API) {
  const api = API.all('project');

  this.getList = () => {
    return api.getList().then(parseProjects);
  };

  this.get = (id) => {
    return api.get(id);
  };

  this.put = (project) => {
    let projectCopy = angular.copy(project);
    projectCopy.startDate = project.startDate.utc().format('x');
    projectCopy.endDate = project.endDate.utc().format('x');

    return api.customPUT(projectCopy, projectCopy.id);
  };

  this.post = (project) => {
    return api.post(project).then(parseProject);
  };

  this.delete = (project) => {
    return api.customDELETE(project.id);
  };

  function parseProject(data) {
    let project = data.plain();

    project.startDate = moment.utc(project.startDate);
    project.endDate = moment.utc(project.endDate);

    return project;
  }

  function parseProjects(data) {
    let projects = data.plain();

    projects.map((project) => {
      project.startDate = moment.utc(project.startDate);
      project.endDate = moment.utc(project.endDate);
      return project;
    });

    return projects;
  }
});
