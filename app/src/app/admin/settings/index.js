import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './settings.routes';

import settingsController from './settings.controller';

import projects from './projects';
import roles from './roles';
import users from './users';

export default angular.module('app.admin.settings', [
  uirouter,
  projects,
  roles,
  users
])
  .controller('SettingsController', settingsController)
  .config(routing)
  .name;
