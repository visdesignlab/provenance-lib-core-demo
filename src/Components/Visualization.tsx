import React, {FC} from 'react';
import styled from 'styled-components';
import FullSizeSVG from './FullSizeSVG';
import data from '../Data/miserables.json';

interface OwnProps {}

type Props = OwnProps;

const Visualization: FC<Props> = () => {
  console.log(data);
  return (
    <VisualizationDiv>
      <VisPadding>
        <VisualizationBorder>
          <FullSizeSVG></FullSizeSVG>
        </VisualizationBorder>
      </VisPadding>
      <VisPadding>
        <VisualizationBorder>
          <FullSizeSVG></FullSizeSVG>
        </VisualizationBorder>
      </VisPadding>
    </VisualizationDiv>
  );
};

export default Visualization;

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
