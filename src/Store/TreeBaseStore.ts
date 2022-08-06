// https://www.youtube.com/watch?v=nGZCL6Wd_zQ
import { DataNode } from "antd/lib/tree";
import { makeAutoObservable } from "mobx";
import { TreeDataType } from "../Types/TreeData";
import MapTreeDataToStyledTreeData from "../utils/MapTreeDataToStyledTreeData";

function removeNodeByKey(key: React.Key, currentTreeData: TreeDataType[]): void {
  for (let node of currentTreeData){
    if (node.id === key){
      currentTreeData.splice(currentTreeData.indexOf(node), 1);
      break;
    }
    if (node.hasChildren && node.children && node.children[0].name !== treeBaseStore.lazyLoadingNodeTitle){
      removeNodeByKey(key, node.children);
    }
  }
}

function renameNodeByKey(key: React.Key, newName: string, currentTreeData: TreeDataType[]): void{
  for(let node of currentTreeData){
    if(node.id === key){
      node.name = newName;
      break;
    } else {
      // if this node has any children (but not the lazy loading title)
      if(node.hasChildren && node.children && node.children[0].name !== treeBaseStore.lazyLoadingNodeTitle){
        renameNodeByKey(key, newName, node.children);
      }
    }
  }
}

/// TODO: can be replaced by getNodeInfoByKey
function getNodeTitleByKey(key: React.Key, currentTreeData: TreeDataType[]): string | undefined {
  for(let node of currentTreeData){
    if(node.id === key){
      return node.name
    } else {
      // if this node has any children (but not the lazy loading title)
      if(node.hasChildren && node.children && node.children[0].name !== treeBaseStore.lazyLoadingNodeTitle){
        const returnValue = getNodeTitleByKey(key, node.children);
        if(returnValue !== undefined){
          return returnValue;
        }
      }
    }
  }

  return undefined;
}

function getNodeInfoByKey(key: React.Key, currentTreeData: TreeDataType[]): TreeDataType | undefined {
  for(let node of currentTreeData){
    if(node.id === key){
      return node
    } else {
      // if this node has any children (but not the lazy loading title)
      if(node.hasChildren && node.children && node.children[0].name !== treeBaseStore.lazyLoadingNodeTitle){
        const returnValue = getNodeInfoByKey(key, node.children);
        if(returnValue !== undefined){
          return returnValue;
        }
      }
    }
  }

  return undefined;
}

function getChildNodesByParentNodeKey(parentNodeKey: React.Key, currentTreeData: TreeDataType[]): TreeDataType[] | undefined {
  for(const node of currentTreeData){
    if(node.id === parentNodeKey){
      if(node.hasChildren && node.children && node.children[0].name !== treeBaseStore.lazyLoadingNodeTitle){
        return node.children;
      } else {
        return undefined;
      }
    }
    // if this node has any children (but not the lazy loading title)
    if(node.hasChildren && node.children && node.children[0].name !== treeBaseStore.lazyLoadingNodeTitle){
      const returnValue = getChildNodesByParentNodeKey(parentNodeKey, node.children);
      if(returnValue !== undefined){
        return returnValue;
      }
    }
  }

  return undefined;
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

function sortTreeNodes (currentTreeData: TreeDataType[]) : void {
  currentTreeData.sort((a, b) => a.name.localeCompare(b.name))
}

class TreeBaseStore {
  treeData: TreeDataType[] = [];
  styledTreeData: DataNode[] = [];

  currentSelectedTreeNodeKey : number = 0;

  // is mouse over tree
  isMouseOver : boolean = false;

  // child node title if there is a data but not loaded (lazy loading title)
  lazyLoadingNodeTitle: string = "loading...";

  constructor() {
    makeAutoObservable(this);
  }

  getChildNodesByParentNodeKey(parentNodeKey: number) : TreeDataType[] | undefined {
    return getChildNodesByParentNodeKey(parentNodeKey, this.treeData);
  }
  
  isCurrentSelectedTreeNodeARootNode(): boolean {
    for (const node of this.treeData){
      if(node.id === this.currentSelectedTreeNodeKey){
        return true
      }
    }

    return false
  }

  removeNodeByKey(key: number){
    removeNodeByKey(key, this.treeData);
  }

  getNodeTitleByKey(key: number) : string {
    const returnValue = getNodeTitleByKey(key, this.treeData);
    return returnValue !== undefined ? returnValue : "loading... (Is not editable! Is part of lazy loading!)";
  }

  getNodeInfoByKey(key: number) : TreeDataType | undefined {
    const returnValue = getNodeInfoByKey(key, this.treeData);
    return returnValue !== undefined ? returnValue : undefined;
  }

  renameNodeByKey(key: number, newName: string){
    renameNodeByKey(key, newName, this.treeData)
  }

  setIsMouseOver(status: boolean){
    this.isMouseOver = status;
  }

  setCurrentSelectedTreeNodeKey(key: number){
    this.currentSelectedTreeNodeKey = key;
  }

  /**
   * @param parentId only with a parentId a group of child nodes can be sorted
   * if there is no parentId, only root nodes will be sorted
   */
  sortTreeNodes(parentId?: number){
    if(parentId){
      // sort group of child nodes
      const childNodes: TreeDataType[] | undefined = this.getChildNodesByParentNodeKey(parentId);
      
      if (childNodes !== undefined){
        sortTreeNodes(childNodes)
      }
    } else {
      // sort root nodes
      sortTreeNodes(this.treeData);
    }
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

  appendRootNodes(rootNodeData: TreeDataType[]) {
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
