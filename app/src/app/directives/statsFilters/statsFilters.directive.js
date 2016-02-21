import statsFilters from './statsFilters.html';

export default ngInject(($q, Project, Skill, User) => {
  return {
    scope: {
      projects: '=',
      skills: '=',
      users: '=',
      stats: '=',
      userData: '='
    },

    link: (scope) => {
      let loadStats = () => {
          Stats.getList()
        },
        initialLoad = () => {
          $q.all([User.getList(), Skill.getList(), Project.getList()]).then((data) => {
            let [users, skills, projects] = data;
            scope.users = users;
            scope.skills = skills;
            scope.projects = projects;
          });
        };

      scope.filters = {
        projects: [],
        skills: [],
        users: [],
        dateFrom: null,
        dateTo: null
      };

      initialLoad();
    },

    template: statsFilters
  };
});
