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

  Notification.scheduleNotfication();

  $scope.$on('$destroy', () => {
    Notification.cancelScheduled();
  });
});
