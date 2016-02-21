import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import ngCookies from 'angular-cookies';
import uirouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';

//manually import styles
import 'angular-material/angular-material.css';

/**
 * Modules
 */
import routing from './app.routes';
import error404 from './error404';
import home from './home';
import user from './user';
import admin from './admin';
import api from '../api';

import material from './material.config';
/**
 * Local imports
 */
import AppController from './app.controller';
import UserController from './user/user.controller';
import statsFilters from './directives/statsFilters/statsFilters.directive';
import filterList from './directives/filterList/filterList.directive';
import logo from './directives/logo/logo.directive';
import ColorSet from './colorSet.constant';

export default angular.module('app', [
  ngCookies,
  ngSanitize,
  uirouter,
  error404,
  home,
  admin,
  api,
  user,
  ngMaterial,
  ngAnimate
]).config(routing)
  .config(material)
  .controller('AppController', AppController)
  .controller('UserController', UserController)
  .directive('logo', logo)
  .directive('filterList', filterList)
  .directive('statsFilters', statsFilters)
  .constant('ColorSet', ColorSet)
  .name;
