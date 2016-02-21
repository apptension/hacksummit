import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './projects.routes.js';

import projectsController from './projects.controller.js';

import projectFormDirective from './components/projectForm/projectFrom.directive';

export default angular.module('app.admin.projects', [
  uirouter
])
  .controller('ProjectsController', projectsController)
  .directive('projectForm', projectFormDirective)
  .config(routing)
  .name;
