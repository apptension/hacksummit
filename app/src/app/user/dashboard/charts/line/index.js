import _ from 'lodash';
import d3 from 'd3';

const defaultConfig = Object.freeze({
  width: 300,
  height: 200,
  margin: {top: 20, right: 20, bottom: 20, left: 20}
});

export default function LineChart(_config) {
  let config = _.extend({}, defaultConfig, _config);
  let xAxis, yAxis, x, y, line;

  config.width = config.width - config.margin.left - config.margin.right;
  config.height = config.height - config.margin.top - config.margin.bottom;

  function chart(selection) {
    selection.each(render);
  }

  function render(data) {
    let chart = d3.select(this) // eslint-disable-line no-invalid-this
      .selectAll('.line-chart').data([data]);

    chart.enter().append('g').classed('line-chart', true);

    chart.attr('transform', `translate(${[config.margin.left, config.margin.top]})`);

    let xValues = _(data.series).map('values').flatten().map('x').flatten().value();
    let yValues = _(data.series).map('values').flatten().map('y').flatten().value();

    x = d3.time.scale().domain(d3.extent(xValues)).range([0, config.width]);
    y = d3.scale.linear().domain(d3.extent(yValues)).range([config.height, 0]);
    xAxis = d3.svg.axis().scale(x).orient('bottom').tickSize(-config.height);
    yAxis = d3.svg.axis().scale(y).orient('left').ticks(5).tickSize(-config.width);
    line = d3.svg.line()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    chart.call(renderXAxis);
    chart.call(renderYAxis);
    chart.call(renderSeries);

    chart.exit().remove();
  }

  function renderXAxis(selection) {
    let xAxisComponent = selection.selectAll('.line-chart-xaxis').data((data) => [data]);

    xAxisComponent.enter()
      .append('g')
      .classed('line-chart-xaxis', true);

    xAxisComponent
      .attr('transform', `translate(0, ${config.height})`)
      .call(xAxis);

    xAxisComponent.exit().remove();
  }

  function renderYAxis(selection) {
    let yAxisComponent = selection.selectAll('.line-chart-yaxis').data((data) => [data]);

    yAxisComponent.enter()
      .append('g')
      .classed('line-chart-yaxis', true);
    yAxisComponent.call(yAxis);
    yAxisComponent.exit().remove();
  }

  function renderSeries(selection) {
    let series = selection.selectAll('.line-chart-series').data((data) => data.series);

    series.enter()
      .append('path')
      .classed('line-chart-series', true);
    series.attr('d', (d) => line(d.values));
    series.exit().remove();
  }

  return chart;
}
