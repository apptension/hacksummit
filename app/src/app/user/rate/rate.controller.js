import template from './rate.html';

export default ngInject(function RateController(User, $state, Question, $mdDialog, $scope) {
  $mdDialog.show({
    template
  });
  $scope.$on('$destroy', $mdDialog.hide);
});
