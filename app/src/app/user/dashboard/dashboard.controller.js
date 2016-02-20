export default ngInject(function DashboardController($scope, $mdSidenav, Stats, Evaluation, Project, Skill, User) {
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

  $scope.$watch('vm.filters', fetchData, true);

  function fetchData() {

  }
});
