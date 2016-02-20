import _ from 'lodash';
import envConfig from 'env-config';
import appTemplate from './app.html';

export default ngInject(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  let availableLanguages = _.map(envConfig.langs, 'code');

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise(`/404`);

  $stateProvider
    .state('app', {
      abstract: true,
      url: `/{lang:(?:${availableLanguages.join('|')})}`,
      template: appTemplate,
      controller: 'AppController',
      controllerAs: 'app',
      params: {
        lang: {squash: true, value: null}
      }
    });
});
