export default ngInject(function UsersController($scope, User, moment) {
  $scope.users = [];
  User.getList().then((data) => {
    $scope.users = data.map((user) => {
      user.edit = false;
      user.updatedAt = moment.utc(user.updatedAt).format("lll");
      return user;
    });
  });

  $scope.toggleItem = (selected) => {
    if (selected.edit) {
      selected.edit = false;
      return;
    }

    $scope.users.forEach((user) => {
      user.edit = false;
    });

    selected.edit = true;
  };
});
