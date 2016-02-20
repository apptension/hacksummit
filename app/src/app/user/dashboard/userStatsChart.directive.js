import d3 from 'd3';
import LineChart from './charts/line';

export default ngInject(() => {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: (scope, element) => {
      let width = 600;
      let height = 400;

      let lineChart = LineChart({width, height}); // eslint-disable-line new-cap

      function render() {
        if (!scope.data) {
          return;
        }

        let svg = d3.select(element[0]).selectAll('svg')
          .data([{
            series: _.map(scope.data.skills, (skill) => {
              return {
                name: skill.name,
                values: _.map(skill.scores, (score) => {
                  return {x: score.date.toDate(), y: score.value};
                })
              };
            })
          }]);

        svg.enter()
          .append('svg')
          .attr({
            width: width,
            height: height,
            viewBox: `0 0 ${width} ${height}`
          });
        svg.call(lineChart);
        svg.exit().remove();
      }

      scope.$watch('data', render, true);
    }
  };
});
