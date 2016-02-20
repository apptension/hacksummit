import homeTemplate from './settings.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.admin.settings', {
      abstract: true,
      url: '/settings',
      template: homeTemplate,
      controller: 'SettingsController',
      controllerAs: 'settings'
    });
});
