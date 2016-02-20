export default ngInject(function DashboardController($mdSidenav, Stats, Evaluation) {
  Stats.getUserStats(1).then((stats) => {
    this.userStats = stats;
  });

  this.skillpointSelected = (skillName, date) => {
    Evaluation.getList(skillName, date.format('x')).then((evaluations) => {
      this.evaluations = evaluations;
      $mdSidenav('commentSidebar').toggle();
    });
  };
});
