import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.routes';

import homeController from './home.controller';

import components from './components'


export default angular.module('app.admin.home', [
  uirouter,
  components
])
  .controller('HomeController', homeController)
  .config(routing)
  .name;
