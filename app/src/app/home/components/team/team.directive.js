import template from './team.html';

export default ngInject(() => {
  return {
    restrict: 'AE',
    template: template,
    link: function ($scope) {
      $scope.roleName = 'Role test';
    }
  };
});
