import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './users.routes.js';

import usersController from './users.controller.js';

import userFormDirective from './components/userForm/userFrom.directive';

export default angular.module('app.admin.users', [
  uirouter
])
  .controller('UsersController', usersController)
  .directive('userForm', userFormDirective)
  .config(routing)
  .name;
