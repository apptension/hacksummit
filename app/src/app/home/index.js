import angular from 'angular';
import uirouter from 'angular-ui-router';

import headerDirective from './components/header/header.directive';
import startDirective from './components/start/start.directive';

import routing from './home.routes';

export default angular.module('app.home', [
  uirouter
]).directive('headerDirective', headerDirective)
  .directive('startDirective', startDirective)
  .config(routing)
  .name;
