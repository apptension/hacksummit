export default ngInject(function HomeController($q, $scope, ColorSet, Project, User, Skill, Stats) {

  $scope.filters = {
    user: [],
    skill: []
  };

  let skillsPromise = Skill.getList().then((skills) => {
    this.skills = _.filter(skills.plain(), ({isSoft}) => !isSoft);
    return this.skills;
  });

  let usersPromise = User.getList().then((users) => {
    this.users = users;
    return this.users;
  });


  let fetchStats = (filters, oldFilters) => {
    if (_.isEqual(filters, oldFilters)) {
      return;
    }

    Stats.getList(filters).then((_stats) => {
      this.stats = _stats.plain();

      skillsPromise.then((skills) => {
        let skillsById = _.keyBy(skills, 'id');

        let userColors = {};
        let usedColorsCount = 0;
        this.stats.skills = _.map(this.stats.skills, (skill) => {
          if (skill.name) {
            skill.name = skillsById[skill.skillId].name;
          }
          skill.scores = _.map(skill.scores, (userScores) => {
            if (!userColors[userScores.userId]) {
              userColors[userScores.userId] = ColorSet[usedColorsCount % ColorSet.length];
              usedColorsCount += 1;
            }
            userScores.color = userColors[userScores.userId];
            return userScores;
          });
          return skill;
        });
      });
    });
  };

  Project.getList().then((projects) => {
    this.projects = projects;
  });

  $q.all([
    skillsPromise,
    usersPromise
  ]).then(([skills, users]) => {
    $scope.filters.skill = _(skills).filter(({isSoft}) => !isSoft).take(3).value();
    $scope.filters.user = _(users).take(3).value();
  });

  $scope.$watch('filters', fetchStats, true);
});
