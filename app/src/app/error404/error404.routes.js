import error404Template from './error404.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.error404', {
      url: '/404',
      template: error404Template
    });
});
