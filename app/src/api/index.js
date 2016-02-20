import angular from 'angular';
import 'restangular';

import API from './api.service';
import User from './user.service';

export default angular.module('api', [
  'restangular'
]).service('API', API)
  .service('User', User)
  .name;
