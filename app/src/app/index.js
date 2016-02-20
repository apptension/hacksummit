import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import ngCookies from 'angular-cookies';
import ngTouch from 'angular-touch';
import uirouter from 'angular-ui-router';

/**
 * Modules
 */
import routing from './app.routes';
import error404 from './error404';
import home from './home';
import user from './user';
import admin from './admin';

/**
 * Local imports
 */
import AppController from './app.controller';
import UserController from './user/user.controller';
import UserRateController from './user/rate/userRate.controller';


export default angular.module('app', [
  ngCookies,
  ngSanitize,
  ngTouch,
  uirouter,
  error404,
  home,
  admin,
  user
])
  .config(routing)
  .controller('AppController', AppController)
  .controller('UserController', UserController)
  .controller('UserRateController', UserRateController)
  .name;
