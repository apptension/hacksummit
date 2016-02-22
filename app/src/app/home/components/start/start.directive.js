import template from './start.html';

export default ngInject((User) => {
  return {
    restrict: 'AE',
    template: template,
    scope: {
      startAs: '&',
      users: '=',
      admin: '='
    },
    link: function ($scope) {
      let getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
      };

      $scope.$watch('users', (users) => {
        if(!users) return;
        $scope.img1 = $scope.users[getRandomInt(0, users.length)].avatar;
        $scope.img2 = $scope.users[getRandomInt(0, users.length)].avatar;
      });

      $scope.randomUser = () => {
        return $scope.users[getRandomInt(0, $scope.users.length)];
      }
    }
  };
});
