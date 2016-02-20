import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './admin.routes';

import adminController from './admin.controller';

import projectsComponent from './components/projects/projects.directive';
import rolesComponent from './components/roles/roles.directive';
import usersComponent from './components/users/users.directive';

export default angular.module('app.admin', [
  uirouter
])
  .directive('projects', projectsComponent)
  .directive('users', usersComponent)
  .directive('roles', rolesComponent)
  .controller('AdminController', adminController)
  .config(routing)
  .name;
