import angular from 'angular';
import uirouter from 'angular-ui-router';

import api from '../../../api';
import NotificationService from './services/notification.service';

import routes from './rate.routes';
import RateController from './rate.controller';


export default angular.module('app.user.rate', [
  uirouter,
  api
]).config(routes)
  .controller('RateController', RateController)
  .service('Notification', NotificationService)
  .name;
