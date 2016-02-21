export default ngInject(($stateProvider) => {
  $stateProvider.state('app.user.dashboard.rate', {
    url: '/rate',
    template: '',
    controller: 'RateController',
    controllerAs: 'vm'
  });
});
