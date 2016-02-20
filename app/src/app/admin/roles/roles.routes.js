import rolesTemplate from './roles.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.admin.roles', {
      url: '/roles',
      template: rolesTemplate,
      controller: 'RolesController',
      controllerAs: 'roles'
    });
});
