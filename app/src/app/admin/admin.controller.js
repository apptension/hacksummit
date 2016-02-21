export default ngInject(function AdminController($scope, $state, User) {
  $scope.HOME_TAB = 0;
  $scope.SETTINGS_TAB = 1;

  User.getProfile().then((me) =>{
    $scope.currentUser = me;
  });

  $scope.openMenu = ($mdOpenMenu, ev) => {
    $mdOpenMenu(ev);
  };

  $scope.logout = () => {
    User.logout();
    $state.go('app.home');
  };

  $scope.getSelectedTab = () => {
    if ($state.current.name.startsWith('app.admin.home')) {
      return $scope.HOME_TAB;
    }
    if ($state.current.name.startsWith('app.admin.settings')) {
      return $scope.SETTINGS_TAB;
    }
  };
});
