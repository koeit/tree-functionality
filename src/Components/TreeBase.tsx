import DirectoryTree, { DirectoryTreeProps } from 'antd/lib/tree/DirectoryTree';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import treeBaseStore from '../Store/TreeBaseStore';
import { TreeDataType } from '../Types/TreeData';
import { EmptyChildNodeData } from '../utils/EmptyChildNodeData';

function TreeBaseItems() {
  let loadedOnce : boolean = false;

  useEffect(() => {
    if(!loadedOnce){
      const demoRootNode : TreeDataType[] = [
        {
          id: 1,
          name: "Swimming",
          description: "All about swimming",
          parentId: undefined,
          hasChildren: false,
          children: undefined
        },
        {
          id: 2,
          name: "Football",
          description: "All about football",
          parentId: undefined,
          hasChildren: true,
          children: [EmptyChildNodeData(2)]
        },
        {
          id: 3,
          name: "F1",
          description: "All about F1 Racing",
          parentId: undefined,
          hasChildren: true,
          children: [EmptyChildNodeData(3)]
        }
      ];
    
      treeBaseStore.appendRootNodes(demoRootNode);

      // sort root nodes
      treeBaseStore.sortTreeNodes();
      
      // sort child nodes (demo data: some children are allready included)
      treeBaseStore.sortTreeNodes(3);

      treeBaseStore.mapTreeDataToStyledTreeData();
      
      loadedOnce = true;
    }

  }, [])
  

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    // console.log('Trigger Select', keys, info);
    treeBaseStore.setCurrentSelectedTreeNodeKey(keys[0] as number)
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    // console.log('Trigger Expand', keys, info);
    const key = keys[keys.length - 1] as number;

    if (treeBaseStore.getNodeInfoByKey(key)?.hasChildren){
      const allChildrenOfThisParent =  treeBaseStore.getChildNodesByParentNodeKey(key);
      
      if (allChildrenOfThisParent === undefined){
        // EmptyChildNodeData with treeBaseStore.lazyLoadingNodeTitle is already loaded.
        // this Data need to be overwritten by loaded data from backend.
        // here this Data will be overwritten by demo data
        const tmpId = Number(new Date());
        treeBaseStore.appendChildNodes([{id: tmpId, name: "demo data", hasChildren: true, children: [EmptyChildNodeData(tmpId)], description: undefined, parentId: (key)}], (key))
        
        treeBaseStore.mapTreeDataToStyledTreeData();
      }
    }
  };
  
  return (
    <div 
      onMouseOver={() => {
        treeBaseStore.setIsMouseOver(true);
      }}
      onMouseLeave={() => {
        treeBaseStore.setIsMouseOver(false);
      }}
    >
      <DirectoryTree      
        onSelect={onSelect}
        onExpand={onExpand}
        selectedKeys={[treeBaseStore.currentSelectedTreeNodeKey]}
        treeData={toJS(treeBaseStore.styledTreeData)}
      />
    </div>
  )
}

const TreeBaseItemsObserver = observer(TreeBaseItems);

export default function TreeBase() {
    return (
        <>
            <TreeBaseItemsObserver />
        </>
    )
}
