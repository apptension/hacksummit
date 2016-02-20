import angular from 'angular';
import 'restangular';

import API from './api.service';
import User from './user.service';
import Evaluation from './evaluation.service';
import Stats from './stats.service';

export default angular.module('api', [
  'restangular'
]).service('API', API)
  .service('User', User)
  .service('Evaluation', Evaluation)
  .service('Stats', Stats)
  .name;
