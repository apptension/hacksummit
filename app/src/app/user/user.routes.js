export default ngInject(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .when('/user', '/user/dashboard');

  $stateProvider
    .state('app.user', {
      abstract: true,
      url: '/user',
      template: '<ui-view></ui-view>',
      controller: 'UserController',
      controllerAs: 'user'
    });
});
