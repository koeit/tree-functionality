// https://www.youtube.com/watch?v=nGZCL6Wd_zQ
import { DataNode } from "antd/lib/tree";
import { makeAutoObservable } from "mobx";
import { TreeDataType } from "../Types/TreeData";
import MapTreeDataToStyledTreeData from "../utils/MapTreeDataToStyledTreeData";

function removeNodeByKey(
  currentTreeData: DataNode[],
  key: React.Key
): DataNode[] {
  // skip map element
  // https://www.thiscodeworks.com/javascript-how-to-skip-over-an-element-in-map-stack-overflow-javascript/6205d7e4a4f5770015a884f5

  return currentTreeData
    .filter((node) => {
      if (node.key === key) {
        return false; // skip
      }

      return true;
    })
    .map((node) => {
      if (node.children) {
        return {
          ...node,
          children: removeNodeByKey(node.children, key),
        };
      }

      return node;
    });
}

function renameNodeByKey(
  currentTreeData: DataNode[],
  key: React.Key,
  newNodeName: JSX.Element
): DataNode[] {
  return currentTreeData
    .filter((node) => {
      if (node.key === key) {
        node.title = newNodeName;
      }

      return true;
    })
    .map((node) => {
      if (node.children) {
        return {
          ...node,
          children: renameNodeByKey(node.children, key, newNodeName),
        };
      }

      return node;
    });
}

function updateTreeData(
  currentTreeData: DataNode[],
  key: React.Key,
  children: DataNode[]
): DataNode[] {
  return currentTreeData.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
}

const appendRootNodes = (rootNodesData: TreeDataType[], currentTreeData: TreeDataType[]) : void => {
  rootNodesData.forEach(rootNode => {
    currentTreeData.push(rootNode);
  })
}

class TreeBaseStore {
  treeData: TreeDataType[] = [];
  styledTreeData: DataNode[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  createAndAppendRootNode(nodeId: number ,nodeName: string, nodeDescription? : string){
    const newRootNode : TreeDataType = {
      id: nodeId,
      name: nodeName,
      description: nodeDescription,
      parentId: undefined,
      hasChildren: false,
      children: undefined
    }

    appendRootNodes([newRootNode], this.treeData);
  }

  appendRootNode(rootNodeData: TreeDataType[]) {
    // append rootNodeData to this.treeData because of call by reference
    appendRootNodes(rootNodeData, this.treeData);
  }

  mapTreeDataToStyledTreeData(){
    this.styledTreeData = MapTreeDataToStyledTreeData([...this.treeData]);
  }
}
const treeBaseStore = new TreeBaseStore();
export default treeBaseStore;
