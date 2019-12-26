export interface NodePosition {
  x: number;
  y: number;
}

export type NodeMap = {[key: string]: NodePosition};

export interface ApplicationState {
  nodePositions: NodeMap;
  selectedNode: string;
}

export const defaultState: ApplicationState = {
  nodePositions: {},
  selectedNode: 'none',
};
