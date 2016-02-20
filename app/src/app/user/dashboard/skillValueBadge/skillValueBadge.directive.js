import template from './skillValueBadge.html';

export default ngInject(() => {
  return {
    restrict: 'A',
    template,
    scope: {
      data: '='
    },
    link: (scope) => {
      function determineBackground(ratio) {
        if (ratio > 70) { return 'lightgreen'; }
        if (ratio > 40) { return 'yellow'; }
        return 'red';
      }

      scope.ratioAwareBackground = (ratio) => {
        return {backgroundColor: determineBackground(ratio)};
      };
    }
  };
});
