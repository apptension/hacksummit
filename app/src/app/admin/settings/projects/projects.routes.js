import projectsTemplate from './projects.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.admin.settings.projects', {
      url: '/projects',
      template: projectsTemplate,
      controller: 'ProjectsController',
      controllerAs: 'projectsCtrl'
    });
});
