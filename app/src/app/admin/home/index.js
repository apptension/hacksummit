import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.routes';

import homeController from './home.controller';


export default angular.module('app.admin.home', [
  uirouter
])
  .controller('AdminHomeController', homeController)
  .config(routing)
  .name;
