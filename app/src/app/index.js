import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import ngCookies from 'angular-cookies';
import ngTouch from 'angular-touch';
import uirouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

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

/**
 * Local imports
 */
import AppController from './app.controller';
import UserController from './user/user.controller';

export default angular.module('app', [
  ngCookies,
  ngSanitize,
  uirouter,
  error404,
  home,
  admin,
  api,
  user,
  ngMaterial
]).config(routing)
  .controller('AppController', AppController)
  .controller('UserController', UserController)
  .name;
