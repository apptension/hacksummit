import statsFilters from './statsFilters.html';

export default ngInject((Project, Skill, User) => {
  return {
    scope: {
      projects: '=',
      skills: '=',
      users: '=',
      stats: '='
    },

    link: (scope) => {
      let loadProjects = () => {
        Project.getList().then((result) => {
          scope.projects = result;
        });
      };
      let init = () => {
        Project.getList().then((result) => {
          scope.projects = result;
        });

        Skill.getList().then((result) => {
          scope.skills = result;
        });

        User.getList().then((result) => {
          scope.users = result;
        });
      };

      scope.filters = {
        projects: [],
        skills: [],
        users: [],
        dateFrom: null,
        dateTo: null
      };

      init();
    },

    template: statsFilters
  };
});
