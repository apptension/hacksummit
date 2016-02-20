import homeTemplate from './home.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '',
      template: homeTemplate
    });
});
