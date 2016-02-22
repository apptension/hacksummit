import tutorialTemplate from './components/tutorialDialog/tutorialDialog.html';

export default ngInject(function UserController($scope, $mdDialog, User, Notification, $state) {
  $scope.isNotificationPending = () => {
    return Notification.notificationPending;
  };

  let openTutorial = () => {
    $mdDialog.show({
      controller: function ($scope) {
        $scope.close = () => {
          $mdDialog.hide();
        }
      },
      template: tutorialTemplate,
      parent: angular.element(document.body),
      clickOutsideToClose: true
    });
  };

  if ($state.current.name !== 'app.user.dashboard.rate') {
    openTutorial();
  }

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
