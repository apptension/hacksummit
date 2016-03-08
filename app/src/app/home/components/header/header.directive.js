import template from './header.html';

export default ngInject((mailChimpService) => {
  return {
    restrict: 'AE',
    template: template,
    link: function ($scope) {
      mailChimpService.initMailChimp().then(() => {
        window.fnames = [];
        window.ftypes = [];
        window.fnames[0] = 'EMAIL';
        window.ftypes[0] = 'email';
      });

      $scope.roleName = 'Role test';

      $scope.scrollToMain = () => {
        let startSectionTop = $('#start').offset().top;
        $('html, body').animate({scrollTop: startSectionTop}, 500);
      }
    }
  };
});
