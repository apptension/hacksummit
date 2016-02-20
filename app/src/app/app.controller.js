export default ngInject(function AppController(User) {
  User.getList().then((users) => {
    console.log('users', users.plain());
  });
});
