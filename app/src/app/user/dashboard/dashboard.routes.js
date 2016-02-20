export default ngInject(($stateProvider) => {
  $stateProvider.state('app.user.dashboard', {
    url: '/dashboard',
    template: '',
    controller: 'DashboardController',
    controllerAs: 'dashboard'
  });
});
