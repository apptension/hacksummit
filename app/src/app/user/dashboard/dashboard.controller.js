export default ngInject(function DashboardController($state, $scope, $mdSidenav, Stats, Evaluation, Project, Skill, User, Notification) {
  let applyFilters = (filterData) => {

  };

  Stats.getUserStats(1).then((stats) => {
    this.userStats = stats;
  });

  Project.getList().then((projects) => {
    this.projects = projects;
  });

  Skill.getList().then((skills) => {
    this.skills = skills;
  });

  User.getProfile().then((profile) => {
    this.userData = profile;
    console.log(profile);
  }, () => {
    $state.go('app.home');
  });

  this.filters = {
    projects: [],
    skills: []
  };

  this.skillpointSelected = (skillName, date) => {
    Evaluation.getList(skillName, date.format('x')).then((evaluations) => {
      this.evaluations = evaluations;
      $mdSidenav('commentSidebar').toggle();
    });
  };

  $scope.$watch('vm.filters', applyFilters, true);

  Notification.scheduleNotfication();

  $scope.$on('$destroy', () => {
    Notification.cancelScheduled();
  });
});
