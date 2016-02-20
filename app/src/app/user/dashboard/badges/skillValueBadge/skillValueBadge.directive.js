import template from './skillValueBadge.html';
import {badgeConfig as config} from './badgeConfig';

export default ngInject(() => {
  return {
    restrict: 'A',
    template,
    scope: {
      data: '='
    },
    link: (scope) => {
      function determineLevel(ratio) {
        if (ratio > 70) { return 'high'; }
        if (ratio > 40) { return 'medium'; }
        return 'low';
      }

      scope.ratioAwareBackground = (ratio) => {
        let lvl = determineLevel(ratio);
        let background = config[lvl].background;
        return {backgroundColor: background};
      };

      scope.ratioAwareCopy = (ratio) => {
        let lvl = determineLevel(ratio);
        return config[lvl].copy;
      };
    }
  };
});
