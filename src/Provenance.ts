import {
  Provenance,
  initProvenance,
  isStateNode,
} from '@visdesignlab/provenance-lib-core';
import {
  ApplicationState,
  defaultState,
  NodeMap,
} from './Interfaces/ApplicationState';
import {store} from './Interfaces/Store';

interface AppProvenance {
  provenance: Provenance<ApplicationState>;
  actions: {
    goForward: () => void;
    goBack: () => void;
    selectNode: (node: string) => void;
    setNodePositions: (pos: NodeMap, skipProvenance?: boolean) => void;
  };
}

export function setupProvenance(): AppProvenance {
  const provenance = initProvenance(defaultState, true);

  provenance.addGlobalObserver(() => {
    let isAtRoot = false;

    const currentNode = provenance.current();

    if (isStateNode(currentNode)) {
      isAtRoot = currentNode.parent === provenance.root().id;
    }

    store.isAtRoot = isAtRoot;
    store.isAtLatest = provenance.current().children.length === 0;
  });

  provenance.addObserver(['nodePositions'], (state?: ApplicationState) => {
    if (
      state &&
      JSON.stringify(store.nodePositions) !==
        JSON.stringify(state.nodePositions)
    ) {
      store.nodePositions = state.nodePositions;
    }
  });

  provenance.addObserver(['selectedNode'], (state?: ApplicationState) => {
    store.selectedNode = state ? state.selectedNode : store.selectedNode;
  });

  provenance.done();

  const setNodePositions = (pos: NodeMap, skipProvenance: boolean = false) => {
    if (skipProvenance) {
      store.nodePositions = JSON.parse(JSON.stringify(pos));
      return;
    }
    provenance.applyAction(
      'Setting node positions',
      (state: ApplicationState) => {
        state.nodePositions = JSON.parse(JSON.stringify(pos));
        return state;
      },
    );
  };

  const selectNode = (node: string) => {
    provenance.applyAction(`Selecting ${node}`, (state: ApplicationState) => {
      if (state.selectedNode === node) {
        state.selectedNode = 'none';
      } else {
        state.selectedNode = node;
      }
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
      setNodePositions,
    },
  };
}
