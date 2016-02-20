import projectsTemplate from './projects.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.admin.projects', {
      url: '/projects',
      template: projectsTemplate,
      controller: 'ProjectsController',
      controllerAs: 'projects'
    });
});
