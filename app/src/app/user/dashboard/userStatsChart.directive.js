import d3 from 'd3';
import LineChart from './charts/line';

export default ngInject(($window, $timeout) => {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      skillpointSelected: '&'
    },
    link: (scope, element) => {
      $timeout(() => {
        let width = element.width();
        let height = element.height();
        let window = angular.element($window);
        let lineChart = LineChart({width, height}); // eslint-disable-line new-cap

        lineChart.on('valueSelected', dispatchSelectedValue);
        window.on('resize', adjustChartSize);
        scope.$watch('data', render, true);
        scope.$on('$destroy', () => {
          render([]);
          window.off('resize', adjustChartSize);
        });

        function dispatchSelectedValue(d) {
          scope.$apply(() => {
            scope.skillpointSelected({date: d});
          });
        }

        function adjustChartSize() {
          width = element.width();
          height = element.height();

          lineChart.width(width).height(height);
          render(scope.data);
        }

        function render(data) {
          if (!data) {
            return;
          }

          let svg = d3.select(element[0]).selectAll('svg')
            .data([{
              series: _.map(data, (skill) => {
                return {
                  name: skill.name,
                  color: skill.color,
                  values: _.map(skill.scores, (score) => {
                    return {
                      x: score.date,
                      y: score.value,
                      color: skill.color,
                      commentsCount: _.reduce(skill.comments, (sum, comment) => {
                        return sum + (comment.date.isSame(score.date) ? 1 : 0);
                      }, 0)
                    };
                  })
                };
              })
            }]);

          svg.enter()
            .append('svg');

          svg.attr({
            width: width,
            height: height,
            viewBox: `0 0 ${width} ${height}`
          }).call(lineChart);
          svg.exit().remove();
        }
      });
    }
  };
});
