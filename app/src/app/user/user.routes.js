import template from './user.html';

export default ngInject(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .when('/user', '/user/dashboard');

  $stateProvider
    .state('app.user', {
      abstract: true,
      url: '/user',
      template,
      controller: 'UserController',
      controllerAs: 'user'
    });
});
