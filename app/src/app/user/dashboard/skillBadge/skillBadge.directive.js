import template from './skillBadge.html';

export default ngInject(() => {
  return {
    restrict: 'A',
    template,
    scope: {
      data: '='
    },
    link: (scope) => {
    }
  };
});
