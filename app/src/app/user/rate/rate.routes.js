import rateTemplate from './rate.html';

export default ngInject(($stateProvider) => {
  $stateProvider.state('app.user.rate', {
    url: '/rate',
    template: rateTemplate,
    controller: 'RateController',
    controllerAs: 'vm'
  });
});
