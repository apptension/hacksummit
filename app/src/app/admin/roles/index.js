import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './roles.routes';

import rolesController from './roles.controller';


export default angular.module('app.admin.roles', [
  uirouter
])
  .controller('RolesController', rolesController)
  .config(routing)
  .name;
