import template from './profileRow.html';

export default ngInject(() => {
  return {
    restrict: 'A',
    template,
    scope: {
      user: '=data'
    },
    link: (scope) => { }
  };
});
