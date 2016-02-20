export default ngInject(function SettingsController($scope, $state) {
  $scope.USERS_TAB = 0;
  $scope.PROJECTS_TAB = 1;
  $scope.ROLES_TAB = 2;

  $scope.getSelectedTab = () => {
    if ($state.current.name.startsWith('app.admin.settings.users')) {
      return $scope.USERS_TAB;
    }
    if ($state.current.name.startsWith('app.admin.settings.projects')) {
      return $scope.PROJECTS_TAB;
    }
    if ($state.current.name.startsWith('app.admin.settings.roles')) {
      return $scope.ROLES_TAB;
    }
  };
});
