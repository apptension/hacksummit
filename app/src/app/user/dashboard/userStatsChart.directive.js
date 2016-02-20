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

      lineChart.on('valueSelected', dispatchSelectedValue);
      scope.$watch('data', render, true);
      scope.$on('$destroy', () => {
        render([]);
      });

      function dispatchSelectedValue(d) {
        let skill = _.find(scope.data.skills, {name: d.seriesName});
        console.log(d, skill);
      }

      function render(data) {
        if (!data) {
          return;
        }

        let svg = d3.select(element[0]).selectAll('svg')
          .data([{
            series: _.map(data.skills, (skill) => {
              return {
                name: skill.name,
                values: _.map(skill.scores, (score) => {
                  return {x: score.date, y: score.value};
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
    }
  };
});
