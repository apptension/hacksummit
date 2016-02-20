import template from './dialogs/addDialog.html';
import DialogController from './dialogs/addDialog.controller';

export default ngInject(function RolesController($scope,$mdDialog, $mdMedia, Role) {
  $scope.roleList = Role.getList();

  $scope.showAdvanced = (ev) => {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      template: template,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: useFullScreen
    })
      .then(function (answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.status = 'You cancelled the dialog.';
      });
  };


  $scope.roleList.forEach((role) => {
    role.edite = false;
  });

  $scope.toggleItem = (selected) => {
    if (selected.edit) {
      selected.edit = false;
      return;
    }

    $scope.roleList.forEach((role) => {
      role.edit = false;
    });

    selected.edit = true;
  };
});
