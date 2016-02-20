import appTemplate from './app.html';

export default ngInject(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise(`/404`);

  $stateProvider
    .state('app', {
      abstract: true,
      url: '',
      template: appTemplate,
      controller: 'AppController',
      controllerAs: 'app'
    });
});
