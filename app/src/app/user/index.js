import angular from 'angular';
import uirouter from 'angular-ui-router';

import dashboard from './dashboard';

import routing from './user.routes';

export default angular.module('app.user', [
  uirouter,
  dashboard
])
  .config(routing)
  .name;
