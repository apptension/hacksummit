export default ngInject(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .when('/user', '/user/dashboard');

  $stateProvider
    .state('app.user', {
      abstract: true,
      url: '/user',
      template: '<ui-view></ui-view>',
      controller: 'UserController',
      controllerAs: 'user',
      resolve: {
        userProfile: function($q, User) {
          let deferred = $q.defer();
          User.getProfile().then(function(data) {
            deferred.resolve(data);
          }, function(data) {
            deferred.reject(data);
          });
          return deferred.promise;
        }
      }
    });
});
