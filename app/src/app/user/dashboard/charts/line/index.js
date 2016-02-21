import _ from 'lodash';
import d3 from 'd3';
import d3Ease from 'd3-ease';
import moment from 'moment';

const defaultConfig = Object.freeze({
  width: 300,
  height: 200,
  margin: {top: 30, right: 50, bottom: 50, left: 50}
});

export default function LineChart(_config) {
  let config = _.extend({}, defaultConfig, _config);
  let xAxis, yAxis, xTimeScale, xOrdinalScale, yScale, emotesScale, line;
  let dispatch = d3.dispatch('valueSelected');

  config.width = config.width - config.margin.left - config.margin.right;
  config.height = config.height - config.margin.top - config.margin.bottom;

  function chart(selection) {
    selection.each(render);
  }

  function render(data) {
    let selection = d3.select(this); // eslint-disable-line no-invalid-this
    let chart = selection.selectAll('.line-chart').data([data]);

    data = _.cloneDeep(data);
    data.series = _.map(data.series, (series) => {
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
      hoveredBandValue: null
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
      .call(renderSeries)
      .call(renderCommentIndicators, me);
    chart.exit().remove();

    me.dispatch.on('bandHitAreaHovered', (value) => {
      me.hoveredBandValue = moment(value);
      chart.call(renderBandBackgrounds, me);
      chart.call(renderCommentIndicators, me);
    });

    me.dispatch.on('bandSelected', (index) => {
      dispatch.valueSelected(xOrdinalScale.domain()[index]);
    });
  }

  function renderBandBackgrounds(selection, me) {
    let bandBackgrounds = selection.selectAll('.line-chart-band-bg')
      .data(xOrdinalScale.domain());

    bandBackgrounds.enter().append('rect').classed('line-chart-band-bg', true);
    bandBackgrounds.attr({
      x: (d) => xOrdinalScale(d),
      y: yScale.range()[1],
      width: xOrdinalScale.rangeBand(),
      height: yScale.range()[0] - yScale.range()[1],
      opacity: (d) => moment(d).isSame(me.hoveredBandValue) ? 1 : 0
    });
    bandBackgrounds.exit().remove();
  }

  function renderBandHitAreas(selection, me) {
    let bandHitAreas = selection.selectAll('.line-chart-band-hitarea')
      .data(xOrdinalScale.domain());

    bandHitAreas.enter().append('rect').classed('line-chart-band-hitarea', true);
    bandHitAreas.attr({
      x: (d) => xOrdinalScale(d),
      y: yScale.range()[1],
      width: xOrdinalScale.rangeBand(),
      height: yScale.range()[0] - yScale.range()[1]
    }).on('mouseenter', (d) => {
      me.dispatch.bandHitAreaHovered(d);
    }).on('mouseleave', (d) => {
      me.dispatch.bandHitAreaHovered(null);
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
      '\uf2e8', // cool
      '\uf2e7', // happy
      '\uf2ee', // tongue
      '\uf2eb', // neutral
      '\uf2ed' // sad
    ]);

    emotes.enter().append('text').classed('line-chart-emote', true).classed('mdi', true);
    emotes.text((d) => d)
      .attr({
        y: function (d, i) {
          return emotesScale(i) + 8;
        },
        x: -50
      });
    emotes.exit().remove();

    let emotesTicks = selection.selectAll('.line-chart-emote-tick').data(d3.range(5));
    emotesTicks.enter().append('line').classed('line-chart-emote-tick', true);
    emotesTicks.text((d) => d)
      .attr({
        y1: (d, i) => emotesScale(i),
        x1: -25,
        y2: (d, i) => emotesScale(i),
        x2: 0
      });
    emotesTicks.exit().remove();
  }

  function renderSeries(selection) {
    let series = selection.selectAll('.line-chart-series').data((data) => data.series);

    series.enter()
      .insert('g', '.line-chart-band-hitarea')
      .classed('line-chart-series', true);
    series.call(renderPaths);
    series.call(renderDots);
    series.exit().remove();
  }

  function renderPaths(selection) {
    let paths = selection.selectAll('.line-chart-series-path').data((data) => {
      let pathLength = 0;
      for (let i = 0; i < data.values.length - 1; i++) {
        let d = data.values[i];
        let d2 = data.values[i + 1];
        let x1 = xOrdinalScale(d.x) + xOrdinalScale.rangeBand() / 2;
        let y1 = yScale(d.y);
        let x2 = xOrdinalScale(d2.x) + xOrdinalScale.rangeBand() / 2;
        let y2 = yScale(d2.y);

        pathLength += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      }

      return [{
        pathLength,
        data
      }];
    });
    paths.enter().append('path').classed('line-chart-series-path', true)
      .classed('is-dashed', (d) => d.data.isDashed)
      .attr({
        stroke: (d) => d.data.color,
        'stroke-dasharray': (d) => {
          if (d.data.isDashed) {
            return [3, 3];
          }
          return [0, d.pathLength];
        },
        opacity: (d) => d.data.isDashed ? 0 : 1,
        d: (d) => line(d.data.values)
      });

    paths
      .transition()
      .duration(1000)
      .delay((d) => d.data.isDashed ? 1000 : 0)
      .ease(d3Ease.easeLinear)
      .attr({
        'stroke-dasharray': (d) => {
          if (d.data.isDashed) {
            return [3, 3];
          }
          return [d.pathLength, d.pathLength];
        },
        opacity: (d) => d.data.isDashed ? 0.5 : 1,
        d: (d) => line(d.data.values)
      });
    paths.exit().remove();
  }

  function renderDots(selection) {
    let dots = selection.selectAll('.line-chart-series-dot').data((data) => {
      if (data.isDashed) {
        return [];
      }

      let values = _.cloneDeep(data.values);
      let pathLength = 0;
      for (let i = 0; i < values.length - 1; i++) {
        let d = values[i];
        let d2 = values[i + 1];
        let x1 = xOrdinalScale(d.x) + xOrdinalScale.rangeBand() / 2;
        let y1 = yScale(d.y);
        let x2 = xOrdinalScale(d2.x) + xOrdinalScale.rangeBand() / 2;
        let y2 = yScale(d2.y);

        pathLength += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        values[i].pathLengthTillPoint = pathLength;
      }
      _.last(values).pathLengthTillPoint = pathLength;
      values.forEach((value) => {
        value.totalPathLength = pathLength;
      });

      return values;
    });
    dots.enter().append('circle').classed('line-chart-series-dot', true)
      .attr({
        cx: (d) => xOrdinalScale(d.x) + xOrdinalScale.rangeBand() / 2,
        cy: (d) => yScale(d.y),
        fill: (d) => d.color,
        r: 0
      });

    dots.transition().duration(500)
      .delay((d) => (1000 * d.pathLengthTillPoint / d.totalPathLength) - 50)
      .ease(d3Ease.easeElasticOut)
      .attr({
        cx: (d) => xOrdinalScale(d.x) + xOrdinalScale.rangeBand() / 2,
        cy: (d) => yScale(d.y),
        fill: (d) => d.color,
        r: 3
      });

    dots.exit().remove();
  }

  function renderCommentIndicators(selection, me) {
    let commentIndicator = selection.selectAll('.line-chart-comment-indicator').data((data) => {
      return _(data.series).map('values').flatten().filter('commentsCount').value();
    });

    commentIndicator.enter()
      .insert('g', '.line-chart-band-hitarea')
      .classed('line-chart-comment-indicator', true)
      .attr({
        opacity: 0,
        transform: (d) => `translate(${[xOrdinalScale(d.x) + xOrdinalScale.rangeBand() / 2, yScale(d.y) + 5]})`
      });
    commentIndicator.transition().duration(500).delay(1000)
      .attr({
        opacity: 1,
        transform: (d) => `translate(${[xOrdinalScale(d.x) + xOrdinalScale.rangeBand() / 2, yScale(d.y) - 5]})`
      });
    commentIndicator.exit().remove();

    let circles = commentIndicator.selectAll('circle').data((d) => [d]);
    circles.enter().append('circle').attr({
      r: 4,
      cy: -10
    });

    circles
      .attr({
        fill: (d) => d.x.isSame(me.hoveredBandValue) ? d.color : '#ffffff'
      })
      .transition().duration(500).ease(d3Ease.easeElasticOut)
      .attr({
        cx: 0,
        cy: (d) => d.x.isSame(me.hoveredBandValue) ? -14 : -10,
        r: (d) => d.x.isSame(me.hoveredBandValue) ? 8 : 4,
        stroke: (d) => d.color,
        'stroke-width': 2
      });
    circles.exit().remove();

    let triangleLine = d3.svg.line().x((d) => d[0]).y((d) => d[1]);
    let triangle = commentIndicator.selectAll('path').data((d) => [d]);
    triangle.enter().append('path');
    triangle.attr({
      d: triangleLine([
        [-3, -6],
        [3, -6],
        [0, -2]
      ]) + 'Z',
      fill: (d) => d.color
    });
    triangle.exit().remove();

    let text = commentIndicator.selectAll('text').data((d) => [d]);
    text.enter().append('text').attr({
      opacity: 0,
      y: -10
    });
    text.text((d) => d.commentsCount)
      .transition().duration(500).ease(d3Ease.easeElasticOut)
      .attr({
        opacity: (d) => d.x.isSame(me.hoveredBandValue) ? 1 : 0
      });
    text.exit().remove();
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
