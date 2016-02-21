import _ from 'lodash';
import d3 from 'd3';

const defaultConfig = Object.freeze({
  width: 300,
  height: 200,
  margin: {top: 20, right: 50, bottom: 50, left: 50}
});

export default function LineChart(_config) {
  let config = _.extend({}, defaultConfig, _config);
  let xAxis, yAxis, xTimeScale, xOrdinalScale, yScale, emotesScale, line;
  let dispatch = d3.dispatch('valueSelected');
  let colorScale = d3.scale.category20();

  config.width = config.width - config.margin.left - config.margin.right;
  config.height = config.height - config.margin.top - config.margin.bottom;

  function chart(selection) {
    selection.each(render);
  }

  function render(data) {
    let selection = d3.select(this); // eslint-disable-line no-invalid-this
    let chart = selection.selectAll('.line-chart').data([data]);

    data = _.cloneDeep(data);
    data.series = _.map(data.series, (series, seriesIndex) => {
      series.values = _.map(series.values, (value) => {
        value.seriesName = series.name;
        return value;
      });
      return series;
    });

    let xValues = _(data.series).map('values').flatten().map('x').sortBy((x) => {
      return parseInt(x.format('x'), 10);
    }).value();
    let me = {
      dispatch: d3.dispatch('bandHitAreaHovered', 'bandSelected'),
      hoveredBandIndex: null
    };

    xOrdinalScale = d3.scale.ordinal().domain(xValues).rangeBands([0, config.width]);
    xTimeScale = d3.time.scale().domain(d3.extent(xValues)).nice().range([0, config.width]);
    yScale = d3.scale.linear().domain([0, 100]).nice().range([config.height, 0]);
    emotesScale = d3.scale.ordinal().domain(d3.range(5)).rangeBands([0, config.height]);

    xAxis = d3.svg.axis().scale(xTimeScale).orient('bottom').tickSize(13);
    yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(5).tickSize(-config.width, 0);
    line = d3.svg.line()
      .x((d) => xOrdinalScale(d.x) + xOrdinalScale.rangeBand() / 2)
      .y((d) => yScale(d.y));

    chart.enter().append('g').classed('line-chart', true);
    chart
      .attr('transform', `translate(${[config.margin.left, config.margin.top]})`)
      .call(renderBandBackgrounds, me)
      .call(renderXAxis)
      .call(renderYAxis)
      .call(renderBandHitAreas, me)
      .call(renderSeries, me);
    chart.exit().remove();

    me.dispatch.on('bandHitAreaHovered', (index) => {
      me.hoveredBandIndex = index;
      chart.call(renderBandBackgrounds, me);
      chart.call(renderSeries, me);
    });

    me.dispatch.on('bandSelected', (index) => {
      dispatch.valueSelected(xOrdinalScale.domain()[index]);
    });
  }

  function renderBandBackgrounds(selection, me) {
    let bandBackgrounds = selection.selectAll('.line-chart-band-bg')
      .data(xOrdinalScale.range());

    bandBackgrounds.enter().append('rect').classed('line-chart-band-bg', true);
    bandBackgrounds.attr({
      x: (d) => d,
      y: yScale.range()[1],
      width: xOrdinalScale.rangeBand(),
      height: yScale.range()[0] - yScale.range()[1],
      opacity: (d, i) => me.hoveredBandIndex === i ? 1 : 0
    });
    bandBackgrounds.exit().remove();
  }

  function renderBandHitAreas(selection, me) {
    let bandHitAreas = selection.selectAll('.line-chart-band-hitarea')
      .data(xOrdinalScale.range());

    bandHitAreas.enter().append('rect').classed('line-chart-band-hitarea', true);
    bandHitAreas.attr({
      x: (d) => d,
      y: yScale.range()[1],
      width: xOrdinalScale.rangeBand(),
      height: yScale.range()[0] - yScale.range()[1]
    }).on('mouseenter', (d, i) => {
      me.dispatch.bandHitAreaHovered(i);
    }).on('click', (d, i) => {
      me.dispatch.bandSelected(i);
    });
    bandHitAreas.exit().remove();
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
        return `translate(0, 10)`; //eslint-disable-line no-invalid-this
      });

    xAxisComponent.exit().remove();
  }

  function renderYAxis(selection) {
    let yAxisComponent = selection.selectAll('.line-chart-yaxis').data((data) => [data]);

    yAxisComponent.enter()
      .append('g')
      .classed('line-chart-yaxis', true);
    yAxisComponent.call(yAxis);
    yAxisComponent.call(renderEmotes);
    yAxisComponent.exit().remove();
  }

  function renderEmotes(selection) {
    let emotes = selection.selectAll('.line-chart-emote').data([
      '\uf2e9', // devil
      '\uf2e8', // cool
      '\uf2e7', // happy
      '\uf2eb', // neutral
      '\uf2ed' // sad
    ]);

    emotes.enter().append('text').classed('line-chart-emote', true).classed('mdi', true);
    emotes.text((d) => d)
      .attr({
        y: function (d, i) {
          return emotesScale(i) + emotesScale.rangeBand() / 2 + this.getBBox().height / 2;
        },
        x: 10
      });
    emotes.exit().remove();
  }

  function renderSeries(selection, me) {
    let series = selection.selectAll('.line-chart-series').data((data) => data.series);

    series.enter()
      .insert('g', '.line-chart-band-hitarea')
      .classed('line-chart-series', true);
    series.call(renderPaths);
    series.call(renderDots, me);
    series.exit().remove();
  }

  function renderPaths(selection) {
    let paths = selection.selectAll('.line-chart-series-path').data((data) => [data]);
    paths.enter().append('path').classed('line-chart-series-path', true)
      .attr('d', (d) => line(mapPointsToStraightLine(d.values)))
      .attr('stroke', (d) => d.color);

    paths
      .transition()
      .duration(1000)
      .attr('d', (d) => line(d.values));
    paths.exit().remove();
  }

  function renderDots(selection, me) {
    let dots = selection.selectAll('.line-chart-series-dot').data((data) => data.values);
    dots.enter().append('circle').classed('line-chart-series-dot', true)
      .attr('opacity', 0).attr('r', 3);

    dots.transition().duration(250)
      .attr({
        cx: (d) => xOrdinalScale(d.x) + xOrdinalScale.rangeBand() / 2,
        cy: (d) => yScale(d.y),
        fill: (d, i) => i === me.hoveredBandIndex ? '#ffffff' : d.color,
        stroke: (d) => d.color,
        strokeWidth: (d, i) => i === me.hoveredBandIndex ? 2 : 0,
        r: (d, i) => i === me.hoveredBandIndex ? 4 : 3
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

  chart.width = (value) => {
    if (typeof value === 'undefined') {
      return config.width;
    }
    config.width = value - config.margin.left - config.margin.right;
    return chart;
  };

  chart.height = (value) => {
    if (typeof value === 'undefined') {
      return config.height;
    }
    config.height = value - config.margin.top - config.margin.bottom;
    return chart;
  };

  d3.rebind(chart, dispatch, 'on');

  return chart;
}
