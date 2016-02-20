import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './user.routes';

export default angular.module('app.user', [
  uirouter
])
  .config(routing)
  .name;
