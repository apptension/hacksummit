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

      let shuffleArray = () => {
        $scope.img1 = $scope.users[getRandomInt(0, $scope.users.length)].avatar;
        $scope.img2 = $scope.users[getRandomInt(0, $scope.users.length)].avatar;
      };

      $scope.users = [];
      User.getList().then((data) => {
        $scope.users = data.map((user) => {
          return user;
        });
        shuffleArray();
      });
    }
  };
});
