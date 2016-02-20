import dashboardTemplate from './dashboard.html';


export default ngInject(($stateProvider) => {
  $stateProvider.state('app.user.dashboard', {
    url: '/dashboard',
    template: dashboardTemplate,
    controller: 'DashboardController',
    controllerAs: 'vm'
  });
});
