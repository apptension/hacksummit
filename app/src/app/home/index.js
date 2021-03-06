import angular from 'angular';
import uirouter from 'angular-ui-router';

import headerDirective from './components/header/header.directive';
import startDirective from './components/start/start.directive';
import ourappDirective from './components/ourapp/ourapp.directive';
import teamDirective from './components/team/team.directive';
import footerDirective from './components/footer/footer.directive';
import HomeController from './home.controller';
import mailChimpService from '../services/mailChimp.service';

import routing from './home.routes';

export default angular.module('app.home', [
  uirouter
]).controller('HomeController', HomeController)
  .directive('headerDirective', headerDirective)
  .directive('startDirective', startDirective)
  .directive('ourappDirective', ourappDirective)
  .directive('teamDirective', teamDirective)
  .directive('footerDirective', footerDirective)
  .service('mailChimpService', mailChimpService)
  .config(routing)
  .name;
