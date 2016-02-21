export default ngInject(function DashboardController($q, $state, $scope, $mdSidenav, ColorSet, Stats,
                                                     Evaluation, Project, Skill, User, Notification, $mdToast) {
  $scope.filters = {
    project: [],
    skill: [],
    user: []
  };
  let skillsPromise;

  let fetchStats = (filters, oldFilters) => {
    if (_.isEqual(filters, oldFilters)) {
      return;
    }

    Stats.getList(filters).then((_stats) => {
      let stats = _stats.plain();
      let skillsById = _.keyBy(this.skills, 'id');

      this.stats = stats;

      skillsPromise.then(() => {
        stats.comments = _.map(stats.comments, (skill) => {
          skill.comments = skill.comments[0].comments;
          return skill;
        });

        let commentsBySkillId = _.keyBy(stats.comments, 'skillId');

        stats.skills = _.map(stats.skills, (skill, i) => {
          let comments = commentsBySkillId[skill.skillId];

          skill.scores = skill.scores[0].scores;
          skill.color = ColorSet[i % ColorSet.length];
          skill.name = skillsById[skill.skillId].name;
          skill.comments = comments ? comments.comments : [];
          skill.average = _.find(stats.average, {skillId: skill.skillId});
          if (skill.average) {
            skill.average.color = skill.color;
            skill.average.isDashed = true;
          }
          return skill;
        });

        User.getProfile().then(u => {
          this.softSkillStats = stats.global
            .map(s => {
              let skill = this.skills.find(sk => sk.id === s.skillId);
              return {
                userId: s.userId,
                skillId: s.skillId,
                score: s.score,
                isSoft: skill.isSoft,
                name: skill.name
              };
            })
            .filter(s => s.isSoft)
            .filter(s => s.userId === u.id);
        });

        this.hardSkillStats = stats.skills.filter(s => !skillsById[s.skillId].isSoft);
        this.hardSkillStats = _.map(this.hardSkillStats, (skill, i) => {
          skill.color = ColorSet[i % ColorSet.length];
          return skill;
        });
      });
    });
  };

  let activeUserPromise = User.getProfile().then(res => {
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

  skillsPromise = Skill.getList().then((skills) => {
    this.skills = skills.plain();
    this.hardSkills = _.filter(this.skills, ({isSoft}) => !isSoft);
    return this.skills;
  });

  $q.all([
    activeUserPromise,
    skillsPromise
  ]).then(([activeUser, skills]) => {
    $scope.filters.user = [activeUser.id];
    $scope.filters.skill = _(skills).filter(({isSoft}) => !isSoft).take(3).value();
  });

  this.skillpointSelected = (skill, date) => {
    let comments = _.find(this.stats.comments, {skillId: skill.skillId});
    if (comments.comments) {
      this.comments = _.filter(comments.comments, (comment) => comment.date.isSame(date));
      if (this.comments.length) {
        $mdSidenav('commentSidebar').toggle();
      }
    }
  };

  Notification.scheduleNotfication();

  $mdToast.show($mdToast
    .simple()
    .hideDelay(20000)
    .textContent('The way Propsy works is that team members are notified about the next question awaiting them. Your notification should appear in 10 seconds. We know you’re busy people, so if you just can’t wait, just click the button below.')
    .position('bottom'));

  $scope.$watch('filters', fetchStats, true);
  $scope.$on('$destroy', () => {
    Notification.cancelScheduled();
  });
});
