import template from './skillBadge.html';

export default ngInject(() => {
  return {
    restrict: 'A',
    template,
    scope: {
      data: '='
    },
    link: (scope, $el) => {
      let step = 0;
      const maxSteps = 50;
      let ratioEl = $el.find('.card__value');

      let interpolate = (val, step) => {
        let input = Math.round(val * 100);
        let rounded = Math.round(step / maxSteps * 100 * val);
        return Math.max(0,Math.min(input, rounded));
      };

      let cancelWatch = scope.$watch('data', (d) => {
        if(!d) return;

        let interval = setInterval(() => {
          let val = interpolate(d.score, step);
          ratioEl.html(`${val}%`);
          if(step++ > maxSteps) {
            clearInterval(interval);
          }
        }, 20);
        cancelWatch();
      });
    }
  };
});
