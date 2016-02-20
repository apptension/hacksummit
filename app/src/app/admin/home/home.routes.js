import homeTemplate from './home.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.admin.home', {
      url: '',
      template: homeTemplate,
      controller: 'HomeController',
      controllerAs: 'home'
    });
});
