import parallax from 'vendor_modules/parallax/jquery.parallax.js';

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

  var $scene = $('.homeStart').parallax(
    {
      calibrateX: false,
      calibrateY: true,
      invertX: false,
      invertY: true,
      limitX: false,
      limitY: 10,
      scalarX: 2,
      scalarY: 8,
      frictionX: 0.2,
      frictionY: 0.8,
      originX: 0.0,
      originY: 1.0
    }
  );
});
