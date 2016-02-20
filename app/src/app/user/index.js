import angular from 'angular';
import uirouter from 'angular-ui-router';

import dashboard from './dashboard';
import rate from './rate';

import routing from './user.routes';

import NotifyButton from './components/notifyButton.directive';

export default angular.module('app.user', [
  uirouter,
  dashboard,
  rate
])
  .config(routing)
  .directive('notifyButton', NotifyButton)
  .name;
