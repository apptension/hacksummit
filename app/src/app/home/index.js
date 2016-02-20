import angular from 'angular';
import uirouter from 'angular-ui-router';

import headerDirective from './components/header/header.directive';
import startDirective from './components/start/start.directive';
import ourappDirective from './components/ourapp/ourapp.directive';
import teamDirective from './components/team/team.directive';
import footerDirective from './components/footer/footer.directive';

import routing from './home.routes';

export default angular.module('app.home', [
  uirouter
]).directive('headerDirective', headerDirective)
  .directive('startDirective', startDirective)
  .directive('ourappDirective', ourappDirective)
  .directive('teamDirective', teamDirective)
  .directive('footerDirective', footerDirective)
  .config(routing)
  .name;
