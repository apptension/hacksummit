import _ from 'lodash';
import d3 from 'd3';

const defaultConfig = Object.freeze({
  width: 100,
  height: 100
});

const thickness = 4;
const shadowThickness = 1;

export default function PieChart(_config) {
  let config = _.extend({}, defaultConfig, _config);
  let radius = Math.min(config.width, config.height) / 2;
  let arc, shadowArc;

  function chart(selection) {
    selection.each(render);
  }

  let mapValueToAngle = d3.scale
    .linear()
    .domain([0, 1])
    .range([0, 2 * Math.PI]);

  function render(data) {
    let chart = d3.select(this) // eslint-disable-line no-invalid-this
      .selectAll('.pie-chart')
      .data([data]);

    chart.enter().append('g')
      .style('transform', `translate(${config.width / 2}px, ${config.height / 2}px)`)
      .classed('pie-chart', true);

    arc = d3.svg.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius)
      .startAngle(0)
      .endAngle(mapValueToAngle);

    shadowArc = d3.svg.arc()
      .innerRadius(radius - thickness / 2 - shadowThickness / 2)
      .outerRadius(radius - thickness / 2 + shadowThickness / 2)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    chart.call(renderPieShadow);
    chart.call(renderPie);

    chart.exit().remove();
  }

  function renderPieShadow(selection) {
    let series = selection.selectAll('.pie-chart-shadow').data((data) => [data]);
    series.enter()
      .append('path')
      .style('fill', '#515050')
      .attr('d', shadowArc)
      .classed('pie-chart-shadow', true);


    series.exit().remove();
  }

  function renderPie(selection) {
    let series = selection.selectAll('.pie-chart-series').data((data) => [data]);
    series.enter()
      .append('path')
      .style('fill', '#009bf1')
      .classed('pie-chart-series', true)
      .attr('d', arc(0))
      .transition()
      .duration(1000)
      .delay(1000)
      .attrTween('d', function (d) {
        var interpolate = d3.interpolate(0, d);
        return function (t) {
          d = interpolate(t);
          return arc(d);
        };
      });

    series.exit().remove();
  }

  return chart;
}
