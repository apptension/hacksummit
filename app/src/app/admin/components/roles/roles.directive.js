export default ngInject(() => {
  return {
    restrict: 'AE',
    link: function ($scope) {
      $scope.roleName = 'Role test';
    }
  };
});

