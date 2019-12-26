import React, {FC} from 'react';
import styled from 'styled-components';
import data from '../Data/miserables.json';
import BarVisualization from './BarVisualization';
import {inject, observer} from 'mobx-react';

interface OwnProps {}

type Props = OwnProps;

const Visualization: FC<Props> = () => {
  return (
    <VisualizationDiv>
      <VisPadding>
        <VisualizationBorder>
          {/* <FullSizeSVG></FullSizeSVG> */}
        </VisualizationBorder>
      </VisPadding>
      <VisPadding>
        <VisualizationBorder>
          <BarVisualization data={data}></BarVisualization>
        </VisualizationBorder>
      </VisPadding>
    </VisualizationDiv>
  );
};

export default inject('store')(observer(Visualization));

const VisualizationBorder = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid black;
`;

const VisPadding = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em;
`;

const VisualizationDiv = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
