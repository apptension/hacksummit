import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './admin.routes';

import adminController from './admin.controller';

import home from './home';
import roles from './roles';
import users from './users';
import projects from './projects';

export default angular.module('app.admin', [
  uirouter,
  home,
  roles,
  users,
  projects
])
  .controller('AdminController', adminController)
  .config(routing)
  .name;
