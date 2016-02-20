import adminTemplate from './admin.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.admin', {
      url: '/admin',
      template: adminTemplate,
      controller: 'AdminController',
      controllerAs: 'admin'
    });
});
