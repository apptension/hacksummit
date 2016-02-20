export default ngInject(() => {
  return {
    restrict: 'C',
    link: function ($scope) {
      $scope.projectName = 'Test';
    }
  };
});

