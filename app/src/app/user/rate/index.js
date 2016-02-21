import angular from 'angular';
import uirouter from 'angular-ui-router';

import api from '../../../api';
import NotificationService from './services/notification.service';
import QuestionService from './services/questions.service';
import RateModal from './rateModal/rateModal.directive';

import routes from './rate.routes';
import RateController from './rate.controller';


export default angular.module('app.user.rate', [
  uirouter,
  api
]).config(routes)
  .controller('RateController', RateController)
  .service('Notification', NotificationService)
  .service('Question', QuestionService)
  .directive('rateModal', RateModal)
  .name;
