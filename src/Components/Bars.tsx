import React, {FC, useEffect, useMemo} from 'react';
import Store from '../Interfaces/Store';
import {inject, observer} from 'mobx-react';
import {
  scaleLinear,
  scaleBand,
  min,
  max,
  select,
  axisBottom,
  axisLeft,
  selectAll,
} from 'd3';
import styled from 'styled-components';
import {actions} from '..';

interface OwnProps {
  store?: Store;
  height: number;
  width: number;
  data: {character: string; count: number}[];
}

type Props = OwnProps;

const Bars: FC<Props> = ({store, width, height, data}: Props) => {
  const {selectedNode} = store!;

  const [xScale, yScale] = useMemo(() => {
    const counts = data.map(d => d.count);
    const [minCount, maxCount] = [min(counts) || 0, max(counts) || 0];

    const xScale = scaleBand()
      .domain(data.map(d => d.character))
      .range([0, width])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    const yScale = scaleLinear()
      .domain([maxCount, minCount])
      .range([0, height])
      .nice();

    return [xScale, yScale];
  }, [height, width, data]);

  useEffect(() => {
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    select('.x-axis').call(xAxis as any);
    select('.y-axis').call(yAxis as any);

    select('.x-axis')
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('dx', '-1em')
      .attr('class', (d: any) => {
        return `bar-text ${d}`;
      })
      .attr('dy', '-1em')
      .style('dominant-baseline', 'middle');
  }, [xScale, yScale]);

  return (
    <>
      <rect
        width={width}
        height={height}
        stroke="black"
        opacity="0.3"
        fill="none"></rect>
      <g className="axes">
        <g transform={`translate(0, ${height})`} className="x-axis"></g>
        <g className="y-axis"></g>
      </g>
      <g className="bars">
        {data.map(({character, count}) => (
          <Bar
            isSelected={selectedNode === character}
            onClick={() => actions.selectNode(character)}
            onMouseOver={() => {
              select(`.${character}`).style('font-weight', 'bold');
            }}
            onMouseOut={() => {
              console.log('Out');
              select(`.${character}`).style('font-weight', 'normal');
            }}
            x={xScale(character)}
            y={yScale(count)}
            width={xScale.bandwidth()}
            height={height - yScale(count)}>
            <title>{character}</title>
          </Bar>
        ))}
      </g>
    </>
  );
};

export default inject('store')(observer(Bars));

interface BarProps {
  isSelected: boolean;
}

const Bar = styled('rect')<BarProps>`
  fill: ${props => (props.isSelected ? 'red' : 'steelblue')};
  &:hover {
    fill: ${props => (props.isSelected ? 'red' : 'blueviolet')};
  }
`;
