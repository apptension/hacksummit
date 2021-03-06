import angular from 'angular';
import 'restangular';

import MockAPI from './mockApi.service';
import API from './api.service';
import User from './user.service';
import Project from './project.service';
import Skill from './skill.service';
import Evaluation from './evaluation.service';
import Stats from './stats.service';
import Role from './role.service';
import moment from 'moment';

export default angular.module('api', [
  'restangular'
]).service('MockAPI', MockAPI)
  .service('API', API)
  .service('User', User)
  .service('Project', Project)
  .service('Skill', Skill)
  .service('Evaluation', Evaluation)
  .service('Stats', Stats)
  .service('Role', Role)
  .service('moment', moment)
  .name;
