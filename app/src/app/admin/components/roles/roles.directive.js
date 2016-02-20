export default ngInject(() => {
  return {
    restrict: 'C',
    link: function ($scope) {
      $scope.roleName = 'Role test';
    }
  };
});

