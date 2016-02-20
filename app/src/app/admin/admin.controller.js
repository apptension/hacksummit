export default ngInject(function AdminController($scope, $state) {
  $scope.HOME_TAB = 0;
  $scope.SETTINGS_TAB = 1;

  $scope.getSelectedTab = () => {
    if ($state.current.name.startsWith('app.admin.home')) {
      return $scope.HOME_TAB;
    }
    if ($state.current.name.startsWith('app.admin.settings')) {
      return $scope.SETTINGS_TAB;
    }
  };
});
