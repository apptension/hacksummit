import template from './dialogs/addDialog.html';
import DialogController from './dialogs/addDialog.controller';

export default ngInject(function RolesController($scope,$mdDialog, $mdMedia, Role, moment) {
  $scope.roleList = [];
  Role.getList().then((data) => {
    $scope.roleList = data.map((role) => {
      role.edit = false;
      role.updatedAt = moment.utc(role.updatedAt).format('lll');
      return role;
    });
  });

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
