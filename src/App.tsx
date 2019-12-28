import React, {FC, useState} from 'react';
import styled from 'styled-components';
import {Container, Header, Menu, Message} from 'semantic-ui-react';
import Visualization from './Components/Visualization';
import {observer, inject} from 'mobx-react';
import Store from './Interfaces/Store';
import UndoRedoButtons from './Components/UndoRedoButtons';

interface OwnProps {
  store?: Store;
}

type Props = OwnProps;

const App: FC<Props> = ({store}: Props) => {
  const {selectedNode} = store!;
  const [showMessage, setShowMessage] = useState(true);

  return (
    <LayoutDiv>
      <Container>
        <LargeHeader textAlign="center" size="huge">
          Les Misérables Character Co-Occurence
        </LargeHeader>
        <Header textAlign="center">Selected Node: {selectedNode}</Header>
      </Container>
      <Container textAlign="center">
        <Menu compact>
          <Menu.Item>
            <UndoRedoButtons></UndoRedoButtons>
          </Menu.Item>
        </Menu>
        {showMessage && (
          <Message
            info
            header={
              'This demo tracks node movement in the graph and selection of any character either from graph or barchart.'
            }
            content={
              'Use the above buttons to undo and redo actions. You can also press (⌘/Ctrl + Z) for undo and (Shift + ⌘/Ctrl + Z) for redo.'
            }
            onDismiss={() => {
              setShowMessage(false);
            }}></Message>
        )}
      </Container>
      <Visualization></Visualization>
    </LayoutDiv>
  );
};

export default inject('store')(observer(App));

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
