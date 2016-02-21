export default ngInject(function DialogController($scope, $mdDialog, roles) {
  $scope.newUser = {
    name: '',
    roles: [],
    isAdmin: false
  };

  $scope.roles = roles;

  $scope.close = () => {
    $mdDialog.cancel();
  };
  $scope.submit = () => {
    $mdDialog.hide($scope.newUser);
  };
});
