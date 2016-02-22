export default ngInject(function UserController($scope, User, Notification, $state) {
  $scope.isNotificationPending = () => {
    return Notification.notificationPending;
  };

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
});
