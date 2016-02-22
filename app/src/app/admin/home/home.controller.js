import tutorialTemplate from '../components/tutorialDialog/tutorialDialog.html';

export default ngInject(function HomeController($q, $scope, $mdDialog, ColorSet, Project, User, Skill, Stats) {

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

  // let openTutorial = () => {
  //   $mdDialog.show({
  //     template: tutorialTemplate,
  //     parent: angular.element(document.body),
  //     clickOutsideToClose: true
  //   });
  // };

  // openTutorial();

  let fetchStats = (filters, oldFilters) => {
    if (_.isEqual(filters, oldFilters)) {
      return;
    }

    Stats.getList(filters).then((_stats) => {
      this.stats = _stats.plain();

      $q.all([skillsPromise, usersPromise]).then(([skills, users]) => {
        let skillsById = _.keyBy(skills, 'id');
        let usersById = _.keyBy(users, 'id');

        let userColors = {};
        let usedColorsCount = 0;
        this.stats.skills = _.map(this.stats.skills, (skill) => {
          if (skillsById[skill.skillId]) {
            skill.name = skillsById[skill.skillId].name;
          }
          let userIds = _.map(skill.scores, 'userId');

          skill.scores = _.map(skill.scores, (userScores) => {
            if (!userColors[userScores.userId]) {
              userColors[userScores.userId] = ColorSet[usedColorsCount % ColorSet.length];
              usedColorsCount += 1;
            }
            userScores.color = userColors[userScores.userId];
            return userScores;
          });

          skill.users = {
            list: _(this.stats.global).filter((global) => {
              return global.skillId === skill.skillId && userIds.indexOf(global.userId) >= 0;
            }).sortBy(({score}) => -score).map((global) => {
              let user = usersById[global.userId],
                userId = (user) ? user.id : undefined;
              user.color = userColors[userId];
              return user;
            }).value()
          };

          return skill;
        });
      });
    });
  };

  Project.getList().then((projects) => {
    this.projects = projects;
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

  this.teamQuality = {
    name: '',
    score: 0.84
  };

  $q.all([
    skillsPromise,
    usersPromise
  ]).then(([skills, users]) => {
    $scope.filters.skill = _(skills).filter(({isSoft}) => !isSoft).take(3).value();
    $scope.filters.user = _(users).take(3).value();
  });

  $scope.$watch('filters', fetchStats, true);
});
