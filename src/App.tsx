import React from 'react';
import styled from 'styled-components';
import {Container, Header, Menu, Button} from 'semantic-ui-react';
import Visualization from './Components/Visualization';

const App: React.FC = () => {
  return (
    <LayoutDiv>
      <Container>
        <LargeHeader textAlign="center" size="huge">
          Les Misérables Character Co-Occurence
        </LargeHeader>
      </Container>
      <Container textAlign="center">
        <Menu compact>
          <Menu.Item>
            <Button.Group size="large">
              <Button icon="undo" content="Undo"></Button>
              <Button.Or></Button.Or>
              <Button icon="redo" content="Redo"></Button>
            </Button.Group>
          </Menu.Item>
        </Menu>
      </Container>
      <Visualization></Visualization>
    </LayoutDiv>
  );
};

export default App;

const LargeHeader = styled(Header)`
  font-size: 4em !important;
  padding: 0.25em !important;
`;

const LayoutDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: min-content min-content 1fr;
`;
