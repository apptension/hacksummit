import moment from 'moment';
import statsFilters from './statsFilters.html';

export default ngInject(($q, Project, Skill, User, Stats) => {
  return {
    scope: {
      filterProjects: '=',
      filterSkills: '=',
      filterUsers: '=',
      filterDateFrom: '=',
      filterDateTo: '=',
      availableSkills: '=',
      availableProjects: '=',
      availableUsers: '='
    },
    template: statsFilters
  };
});
