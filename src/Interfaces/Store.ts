import {observable, computed} from 'mobx';
import {NodeMap, defaultState} from './ApplicationState';

export default class Store {
  @observable isAtRoot: boolean = true;
  @observable isAtLatest: boolean = true;
  @observable selectedNode: string = defaultState.selectedNode;
  @observable nodePositions: NodeMap = defaultState.nodePositions;
  @computed get getNodePositions() {
    return JSON.parse(JSON.stringify(this.nodePositions));
  }
  @computed get isNodePositionSet() {
    return (
      this.nodePositions.nodes.length > 0 && this.nodePositions.links.length > 0
    );
  }
}

export const store = new Store();
