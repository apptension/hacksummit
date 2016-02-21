import moment from 'moment';

export default ngInject(function DashboardController($q, $state, $scope, $mdSidenav, ColorSet, Stats, Evaluation, Project, Skill, User, Notification) {
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


      skillsPromise.then(() => {
        stats.comments = _.map(stats.comments, (skill) => {
          skill.comments = skill.comments[0].comments;
          return skill;
        });

        let commentsBySkillId = _.keyBy(stats.comments, 'skillId');

        stats.skills = _.map(stats.skills, (skill, i) => {
          skill.scores = skill.scores[0].scores;
          skill.color = ColorSet[i % ColorSet.length];
          skill.name = skillsById[skill.skillId].name;
          skill.comments = commentsBySkillId[skill.skillId].comments || [];
          return skill;
        });

        this.softSkillStats = stats.global
          .map(s => {
            let skill = this.skills.find(sk => sk.id === s.skillId);
            return {
              skillId: s.skillId,
              score: s.score,
              isSoft: skill.isSoft,
              name: skill.name
            };
          })
          .filter(s => s.isSoft);

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

  let formatDateRange = (date) => {
    let dateStart = moment(date).format('YYYY.MM.DD'),
      dateEnd = moment(date).add(6, 'days').format('YYYY.MM.DD');
    return dateStart + ' - ' + dateEnd;
  };

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
    return this.skills;
  });

  $q.all([
    activeUserPromise,
    skillsPromise
  ]).then(([activeUser, skills]) => {
    $scope.filters.user = [activeUser.id];
    $scope.filters.skill = _.take(skills, 3);
  });

  this.skillpointSelected = (date) => {
    this.evaluationsDateRange = formatDateRange(date);
    Evaluation.getList(date.format('x')).then((evaluations) => {
      this.evaluations = evaluations;
      $mdSidenav('commentSidebar').toggle();
    });
  };

  this.commentsClose = () => {
    $mdSidenav('commentSidebar').close();
  };

  Notification.scheduleNotfication();

  $scope.$watch('filters', fetchStats, true);
  $scope.$on('$destroy', () => {
    Notification.cancelScheduled();
  });
});
