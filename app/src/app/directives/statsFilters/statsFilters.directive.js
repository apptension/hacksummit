import moment from 'moment';
import statsFilters from './statsFilters.html';

export default ngInject(($q, Project, Skill, User, Stats) => {
  return {
    scope: {
      projects: '=',
      skills: '=',
      users: '=',
      stats: '=',
      userId: '='
    },

    link: (scope) => {
      let serializeFilters = (data) => {
          let idFn = (obj) => {
              return obj.id;
            },
            filters = _.cloneDeep(data);

          filters.projects = filters.projects.map(idFn);
          filters.skills = filters.projects.map(idFn);
          filters.users = filters.projects.map(idFn);

          if (data.dateFrom) {
            filters.dateFrom = moment(filters.dateFrom).format('YYYY-MM-DD');
          }
          if (data.dateTo) {
            filters.dateTo = moment(filters.dateTo).format('YYYY-MM-DD');
          }

          return filters;
        },

        loadStats = () => {
          if (scope.userId) {
            Stats.getUserStats(scope.userId, serializeFilters(scope.filters)).then((stats) => {
              scope.stats = stats;
            });
          } else {
            Stats.getList(serializeFilters(scope.filters)).then((stats) => {
              scope.stats = stats;
            });
          }
        },

        initialLoad = () => {
          if (scope.userId) {
            return $q.all([Skill.getList(), Project.getList()]).then((data) => {
              let [skills, projects] = data;
              scope.skills = skills;
              scope.projects = projects;
            });
          } else {
            return $q.all([User.getList(), Skill.getList(), Project.getList()]).then((data) => {
              let [users, skills, projects] = data;
              scope.users = users;
              scope.skills = skills;
              scope.projects = projects;
            });
          }
        };

      scope.filters = {
        projects: [],
        skills: [],
        users: [],
        dateFrom: null,
        dateTo: null
      };

      scope.$watch('filters', (val, old) => {
        if (val === old) {
          return;
        }
        loadStats();
      }, true)

      initialLoad().then(loadStats);
    },

    template: statsFilters
  };
});
