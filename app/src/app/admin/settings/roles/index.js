import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './roles.routes.js';

import rolesController from './roles.controller.js';
import roleItemDirective from './components/role/role-item.directive';

export default angular.module('app.admin.roles', [
  uirouter
])
  .controller('RolesController', rolesController)
  .directive('roleItemDirective',roleItemDirective)
  .config(routing)
  .name;
