import template from './header.html';

export default ngInject(() => {
  return {
    restrict: 'AE',
    template: template,
    link: function ($scope) {
      $scope.roleName = 'Role test';

      $scope.scrollToMain = () => {
        let startSectionTop = $('#start').offset().top;
        $('html, body').animate({scrollTop:startSectionTop}, 500);
      }
    }
  };
});
