export default ngInject(function DashboardController($state, $scope, $mdSidenav, Stats, Evaluation, Project, Skill, User, Notification) {
  Stats.getUserStats(1).then((stats) => {
    this.softSkillStats = stats.skills.filter(s => s.isSoft);
    this.hardSkillStats = stats.skills.filter(s => !s.isSoft);
  });

  Stats.getContributors().then((contributors) => {
    this.contributorsList = {
      list: contributors.list,
      rank: contributors.rank
    };
  });

  Project.getList().then((projects) => {
    this.projects = projects;
  });

  Skill.getList().then((skills) => {
    this.skills = skills;
  });

  User.getProfile().then((profile) => {
    this.userData = profile;
  }, () => {
    $state.go('app.home');
  });

  this.filters = {
    projects: [],
    skills: []
  };

  this.skillpointSelected = (date) => {
    Evaluation.getList(date.format('x')).then((evaluations) => {
      this.evaluations = evaluations;
      $mdSidenav('commentSidebar').toggle();
    });
  };

  $scope.$watch('vm.filters', fetchData, true);

  function fetchData() {

  }

  Notification.scheduleNotfication();

  $scope.$on('$destroy', () => {
    Notification.cancelScheduled();
  });
});
