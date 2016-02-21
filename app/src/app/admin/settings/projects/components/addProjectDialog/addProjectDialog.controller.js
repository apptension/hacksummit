export default ngInject(function DialogController($scope, $mdDialog, users) {
  $scope.newProject = {
    name: '',
    Users: [],
    startDate: new Date(),
    endDate: new Date()
  };

  $scope.users = users;

  $scope.close = () => {
    $mdDialog.cancel();
  };
  $scope.submit = () => {
    $mdDialog.hide($scope.newProject);
  };
});
