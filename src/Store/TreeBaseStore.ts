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

/// TODO: need refactoring
function appendChildNodes(children: TreeDataType[], parentNodeId: React.Key, currentTreeData: TreeDataType[]): void{
  currentTreeData.forEach(node => {
    if(node.id === parentNodeId){      
      if(node.children && node.children.length === 1 && node.children[0].name === "loading..."){
        // overwrite loading... (from lazy loading)
        node.children = children;
      } else {
        if(node.children){
          // append to existing array
          children.forEach(child => {
            node.children!.push(child)
          })
        } else {
          // initialize a new array
          node.hasChildren = true;
          node.children = [...children];
        }   
      }
    } else {
      if(node.hasChildren){
        if(node.children![0].name !== "loading..."){
          appendChildNodes(children, parentNodeId, node.children!)
        }
      }
    }
  })
}

const appendRootNodes = (rootNodesData: TreeDataType[], currentTreeData: TreeDataType[]) : void => {
  rootNodesData.forEach(rootNode => {
    currentTreeData.push(rootNode);
  })
}

class TreeBaseStore {
  treeData: TreeDataType[] = [];
  styledTreeData: DataNode[] = [];

  currentSelectedTreeNodeKey : number = 0;

  // is mouse over tree
  isMouseOver : boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsMouseOver(status: boolean){
    this.isMouseOver = status;
  }

  setCurrentSelectedTreeNodeKey(key: number){
    this.currentSelectedTreeNodeKey = key;
  }

  createAndAppendChildNode(nodeId: number, nodeName: string, nodeDescription? : string) {
    if (this.currentSelectedTreeNodeKey !== 0){
      const newChildNode : TreeDataType = {
        id: nodeId,
        name: nodeName,
        description: nodeDescription,
        parentId: this.currentSelectedTreeNodeKey,
        hasChildren: false,
        children: undefined
      }
  
      this.appendChildNodes([newChildNode], this.currentSelectedTreeNodeKey);
    }
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

  appendChildNodes(childNodesData: TreeDataType[], parentNodeKey: number){
    appendChildNodes(childNodesData, parentNodeKey, this.treeData);
  }

  mapTreeDataToStyledTreeData(){
    this.styledTreeData = MapTreeDataToStyledTreeData([...this.treeData]);
  }
}
const treeBaseStore = new TreeBaseStore();
export default treeBaseStore;
