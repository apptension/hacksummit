export default ngInject(function DashboardController($q, $state, $scope, $mdSidenav, ColorSet, Stats, Evaluation, Project, Skill, User, Notification) {
  $scope.filters = {
    project: [],
    skill: [],
    user: []
  };

  let fetchStats = (filters, oldFilters) => {
    if (_.isEqual(filters, oldFilters)) {
      return;
    }

    Stats.getList(filters).then((_stats) => {
      let stats = _stats.plain();
      stats.skills = _.map(stats.skills, (skill, i) => {
        skill.scores = skill.scores[0].scores;
        skill.color = ColorSet[i % ColorSet.length];
        skill.name = _.find(this.skills, {id: skill.skillId}).name;
        return skill;
      });

      this.softSkillStats = stats.skills.filter(s => s.isSoft);
      this.hardSkillStats = stats.skills.filter(s => !s.isSoft);
    });
  };

  let activeUser = User.getProfile().then(res => {
    this.activeUser = res.plain();
    return this.activeUser;
  });

  Stats.getContributors().then((contributors) => {
    this.contributorsList = {
      list: contributors
        .sort(c => -c.score)
        .map(c => {
          return c.User;
        })
    };
  });

  Project.getList().then((projects) => {
    this.projects = projects;
  });

  let skills = Skill.getList().then((skills) => {
    this.skills = skills.plain();
    return this.skills;
  });

  $q.all([
    activeUser,
    skills
  ]).then(([activeUser, skills]) => {
    $scope.filters.user = [activeUser.id];
    $scope.filters.skill = _.take(skills, 3);
  });

  this.skillpointSelected = (date) => {
    Evaluation.getList(date.format('x')).then((evaluations) => {
      this.evaluations = evaluations;
      $mdSidenav('commentSidebar').toggle();
    });
  };

  Notification.scheduleNotfication();

  $scope.$watch('filters', fetchStats, true);
  $scope.$on('$destroy', () => {
    Notification.cancelScheduled();
  });
});
