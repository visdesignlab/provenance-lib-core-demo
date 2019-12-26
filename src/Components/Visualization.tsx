import React, {FC} from 'react';
import styled from 'styled-components';
import FullSizeSVG from './FullSizeSVG';

interface OwnProps {}

type Props = OwnProps;

const Visualization: FC<Props> = () => {
  return (
    <VisualizationDiv>
      <FullSizeSVG></FullSizeSVG>
      <FullSizeSVG></FullSizeSVG>
    </VisualizationDiv>
  );
};

export default Visualization;

const VisualizationDiv = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
