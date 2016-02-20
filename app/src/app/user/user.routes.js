import userRateTemplate from './rate/userRate.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.user', {
      abstract: true,
      url: '/user',
      template: '<ui-view></ui-view>',
      controller: 'UserController',
      controllerAs: 'user'
    })
    .state('app.user.rate', {
      url: '/rate',
      template: userRateTemplate,
      controller: 'UserRateController',
      controllerAs: 'rate'
    })
    .state('app.user.dashboard', {
      url: '/dashboard',
      template: '',
      controller: 'UserDashboardController',
      controllerAs: 'dashboard'
    });
});
