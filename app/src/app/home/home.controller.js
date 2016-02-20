export default ngInject(function HomeController($scope, $state, User) {
  User.getList().then((data) => {
    let users = data.plain();
    this.admin = _.find(users, 'isAdmin');
    this.users = _.without(users, this.admin);
  });

  this.startAs = (userId) => {
    User.login(userId).then(() => {
      if (userId === this.admin.id) {
        $state.go('app.admin.home');
      } else {
        $state.go('app.user.dashboard');
      }
    });
  };
});
