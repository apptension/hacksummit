import angular from 'angular';
import uirouter from 'angular-ui-router';

import api from '../../../api';

import routes from './dashboard.routes';
import DashboardController from './dashboard.controller';
import userStatsChart from './userStatsChart.directive';
import pieChart from './pieChart.directive';
import skillBadge from './badges/skillValueBadge/skillValueBadge.directive';
import softSkills from './softSkills.filter';
import profileImage from './profile/profileImage/profileImage.directive';


export default angular.module('app.user.dashboard', [
  uirouter,
  api
]).config(routes)
  .controller('DashboardController', DashboardController)
  .directive('userStatsChart', userStatsChart)
  .directive('pieChart', pieChart)
  .directive('skillBadge', skillBadge)
  .directive('profileImage', profileImage)
  .filter('softSkills', softSkills)
  .name;
