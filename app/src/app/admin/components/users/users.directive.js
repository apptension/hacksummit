export default ngInject(() => {
  return {
    restrict: 'C',
    link: function ($scope) {
      $scope.userName = 'user Test';
    }
  };
});

