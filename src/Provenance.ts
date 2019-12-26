import {Provenance, initProvenance} from '@visdesignlab/provenance-lib-core';
import {ApplicationState, defaultState} from './Interfaces/ApplicationState';
import {store} from './Interfaces/Store';

interface AppProvenance {
  provenance: Provenance<ApplicationState>;
  actions: {
    goForward: () => void;
    goBack: () => void;
    selectNode: (node: string) => void;
  };
}

export function setupProvenance(): AppProvenance {
  const provenance = initProvenance(defaultState);

  provenance.addGlobalObserver(() => {
    store.isAtRoot = provenance.current().id === provenance.graph().root;
    store.isAtLatest = provenance.current().children.length === 0;
  });

  provenance.addObserver(['nodePositions'], (state?: ApplicationState) => {
    store.nodePositions = state ? state.nodePositions : store.nodePositions;
  });

  provenance.addObserver(['selectedNode'], (state?: ApplicationState) => {
    store.selectedNode = state ? state.selectedNode : store.selectedNode;
  });

  provenance.done();

  const selectNode = (node: string) => {
    provenance.applyAction(`Selecting ${node}`, (state: ApplicationState) => {
      state.selectedNode = node;
      return state;
    });
  };

  const goForward = () => {
    provenance.goForwardOneStep();
  };

  const goBack = () => {
    provenance.goBackOneStep();
  };

  return {
    provenance,
    actions: {
      goBack,
      goForward,
      selectNode,
    },
  };
}
