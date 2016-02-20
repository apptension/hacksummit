import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './users.routes';

import usersController from './users.controller';


export default angular.module('app.admin.users', [
  uirouter
])
  .controller('UsersController', usersController)
  .config(routing)
  .name;
