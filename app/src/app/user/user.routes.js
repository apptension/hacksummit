import userTemplate from './user.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.user', {
      url: '/user',
      template: userTemplate,
      controller: 'UserController',
      controllerAs: 'user'
    });
});
