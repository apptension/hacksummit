export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.user', {
      abstract: true,
      url: '/user',
      template: '<ui-view></ui-view>',
      controller: 'UserController',
      controllerAs: 'user'
    });
});
