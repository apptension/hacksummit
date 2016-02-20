export default ngInject(function DashboardController($mdSidenav, Stats, Evaluation, User) {
  Stats.getUserStats(1).then((stats) => {
    this.userStats = stats;
  });

  User.getProfile().then((profile) => {
    this.userData = profile;
  });

  this.skillpointSelected = (skillName, date) => {
    Evaluation.getList(skillName, date.format('x')).then((evaluations) => {
      this.evaluations = evaluations;
      $mdSidenav('commentSidebar').toggle();
    });
  };
});
