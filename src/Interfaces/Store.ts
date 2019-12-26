import {observable} from 'mobx';
import {NodeMap, defaultState} from './ApplicationState';

export default class Store {
  @observable isAtRoot: boolean = true;
  @observable isAtLatest: boolean = true;
  @observable selectedNode: string = defaultState.selectedNode;
  @observable nodePositions: NodeMap = defaultState.nodePositions;
}

export const store = new Store();
