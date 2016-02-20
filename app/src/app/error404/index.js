import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './error404.routes';

export default angular.module('app.error', [
  uirouter
])
  .config(routing)
  .name;
