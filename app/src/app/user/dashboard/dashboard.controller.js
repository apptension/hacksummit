export default ngInject(function DashboardController($state, $scope, $mdSidenav, Stats, Evaluation, Project, Skill, User, Notification) {
  let loadStats = () => {
      this.userData.id = 1;
      Stats.getUserStats(this.userData.id).then((stats) => {
        this.userStats = stats;
      });
    },

    applyFilters = () => {

    },

    init = () => {
      User.getProfile().then((profile) => {
        this.userData = profile;
      }, () => {
        $state.go('app.home');
      }).then(loadStats);
    };

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

  init();
});
