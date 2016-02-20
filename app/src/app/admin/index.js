import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './admin.routes';

import adminController from './admin.controller';

import api from '../../api';


import home from './home';
import settings from './settings';


export default angular.module('app.admin', [
  uirouter,
  home,
  api,
  settings
])
  .controller('AdminController', adminController)
  .config(routing)
  .name;
