import template from './start.html';

export default ngInject(() => {
  return {
    restrict: 'AE',
    template: template,
    scope: {
      startAs: '&',
      users: '=',
      admin: '='
    },
    link: function ($scope) {
      $scope.roleName = 'Role test';
    }
  };
});
