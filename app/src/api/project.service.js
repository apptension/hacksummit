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
    projectCopy.startDate = moment(project.startDate).format('x');
    projectCopy.endDate = moment(project.endDate).format('x');

    return api.customPUT(projectCopy, projectCopy.id);
  };

  this.post = (project) => {
    let copy = angular.copy(project);
    copy.startDate = moment(copy.startDate).format('x');
    copy.endDate = moment(copy.endDate).format('x');
    return api.post(copy).then(parseProject);
  };

  this.delete = (project) => {
    return api.customDELETE(project.id);
  };

  function parseProject(data) {
    let project = data.plain();

    project.startDate = moment(project.startDate);
    project.endDate = moment(project.endDate);

    return project;
  }

  function parseProjects(data) {
    let projects = data.plain();

    projects.map((project) => {
      project.startDate = moment(project.startDate);
      project.endDate = moment(project.endDate);
      return project;
    });

    return projects;
  }
});
