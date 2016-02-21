import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './roles.routes.js';

import rolesController from './roles.controller.js';
import roleFormDirective from './components/roleForm/roleForm.directive';

export default angular.module('app.admin.roles', [
  uirouter
])
  .controller('RolesController', rolesController)
  .directive('roleForm',roleFormDirective)
  .config(routing)
  .name;
