import _ from 'lodash';
import d3 from 'd3';

const defaultConfig = Object.freeze({
  width: 100,
  height: 100
});

const thickness = 12;

export default function PieChart(_config) {
  let config = _.extend({}, defaultConfig, _config);
  let radius = Math.min(config.width, config.height) / 2;
  let arc;

  function chart(selection) {
    selection.each(render);
  }

  let mapValueToAngle = d3.scale
    .linear()
    .domain([0, 100])
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
      .startAngle(() => mapValueToAngle(0))
      .endAngle(mapValueToAngle);

    chart.call(renderPie);

    chart.exit().remove();
  }

  function renderPie(selection) {
    let series = selection.selectAll('.pie-chart-series').data((data) => [data]);
    series.enter()
      .append('path')
      .style('fill', '#7b6888')
      .classed('pie-chart-series', true);

    series
      .attr('d', (d) => arc(d));

    series.exit().remove();
  }

  return chart;
}