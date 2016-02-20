import d3 from 'd3';
import PieChart from './charts/pie';

export default ngInject(() => {
  return {
    restrict: 'A',
    scope: {
      data: '='
    },
    link: (scope, element) => {
      let width = 100;
      let height = 100;

      let pieChart = PieChart({width, height}); // eslint-disable-line new-cap

      let svg = d3.select(element[0]).selectAll('svg')
        .data([scope.data]);

      svg.enter()
        .append('svg')
        .attr({
          width: width,
          height: height,
          viewBox: `0 0 ${width} ${height}`
        });
      svg.call(pieChart);
      svg.exit().remove();
    }
  };
});
