import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './admin.routes';

export default angular.module('app.admin', [
  uirouter
])
  .config(routing)
  .name;
