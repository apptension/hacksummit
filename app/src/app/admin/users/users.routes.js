import usersTemplate from './users.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.admin.users', {
      url: '/users',
      template: usersTemplate,
      controller: 'UsersController',
      controllerAs: 'users'
    });
});
