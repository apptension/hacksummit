import _ from 'lodash';
import d3 from 'd3';

const defaultConfig = Object.freeze({
  width: 300,
  height: 200,
  margin: {top: 20, right: 20, bottom: 50, left: 50}
});

export default function LineChart(_config) {
  let config = _.extend({}, defaultConfig, _config);
  let xAxis, yAxis, xTimeScale, xOrdinalScale, yScale, line;
  let dispatch = d3.dispatch('valueSelected');
  let colorScale = d3.scale.category20();

  config.width = config.width - config.margin.left - config.margin.right;
  config.height = config.height - config.margin.top - config.margin.bottom;

  function chart(selection) {
    selection.each(render);
  }

  function render(data) {
    data = _.cloneDeep(data);
    data.series = _.map(data.series, (series, seriesIndex) => {
      series.index = seriesIndex;
      series.values = _.map(series.values, (value) => {
        value.seriesName = series.name;
        value.seriesIndex = seriesIndex;
        return value;
      });
      return series;
    });

    let xValues = _(data.series).map('values').flatten().map('x').value();
    let yValues = _(data.series).map('values').flatten().map('y').value();

    xOrdinalScale = d3.scale.ordinal().domain(xValues).rangeBands([0, config.width]);
    xTimeScale = d3.time.scale().domain(d3.extent(xValues)).nice().range([0, config.width]);
    yScale = d3.scale.linear().domain(d3.extent(yValues)).nice().range([config.height, 0]);
    //colorScale.domain(d3.range(data.series.length));

    xAxis = d3.svg.axis().scale(xTimeScale).orient('bottom').tickSize(-config.height);
    yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(5).tickSize(-config.width);
    line = d3.svg.line()
      .x((d) => xOrdinalScale(d.x) + xOrdinalScale.rangeBand() / 2)
      .y((d) => yScale(d.y))
      .interpolate('cardinal');

    let chart = d3.select(this) // eslint-disable-line no-invalid-this
      .selectAll('.line-chart').data([data]);

    chart.enter().append('g').classed('line-chart', true);

    chart
      .attr('transform', `translate(${[config.margin.left, config.margin.top]})`)
      .call(renderXAxis)
      .call(renderYAxis)
      .call(renderSeries);

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

    xAxisComponent.selectAll('text')
      .attr('transform', function () {
        return `translate(${this.getBBox().height * -2},${this.getBBox().height}) rotate(-45)`; //eslint-disable-line no-invalid-this
      });

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
      .append('g')
      .classed('line-chart-series', true);
    series.call(renderPaths);
    series.call(renderDots);
    series.exit().remove();
  }

  function renderPaths(selection) {
    let paths = selection.selectAll('.line-chart-series-path').data((data) => [data]);
    paths.enter().append('path').classed('line-chart-series-path', true)
      .attr('d', (d) => line(mapPointsToStraightLine(d.values)))
      .attr('stroke', (d) => colorScale(d.index));

    paths
      .transition()
      .duration(1000)
      .attr('d', (d) => line(d.values));
    paths.exit().remove();
  }

  function renderDots(selection) {
    let dots = selection.selectAll('.line-chart-series-dot').data((data) => data.values);
    dots.enter().append('circle').classed('line-chart-series-dot', true).attr('opacity', 0);
    dots.attr({
      cx: (d) => xOrdinalScale(d.x) + xOrdinalScale.rangeBand() / 2,
      cy: (d) => yScale(d.y),
      r: 3,
      fill: (d) => colorScale(d.seriesIndex)
    }).on('click', (d) => {
      dispatch.valueSelected(d);
    });

    dots.transition().duration(500).delay(1000)
      .attr('opacity', 1);

    dots.exit().remove();
  }
  
  function mapPointsToStraightLine(points) {
    let a = (_.first(points).y - _.last(points).y) / (_.first(points).x - _.last(points).x);
    let b = _.first(points).y - a * _.first(points).x;

    return _.map(points, (point) => {
      return _.extend({}, point, {
        x: point.x,
        y: a * point.x + b
      });
    });
  }

  d3.rebind(chart, dispatch, 'on');

  return chart;
}
