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
          children: [
            {
              id: 4,
              name: "Drivers",
              description: "All about the drivers",
              parentId: undefined,
              hasChildren: true,
              children: [EmptyChildNodeData(4)]
            },
            {
              id: 5,
              name: "Cars",
              description: "All about cars",
              parentId: undefined,
              hasChildren: true,
              children: [EmptyChildNodeData(5)]
            },
            {
              id: 6,
              name: "Current Location",
              description: undefined,
              parentId: undefined,
              hasChildren: false,
              children: undefined
            },
          ]
        },
      ];
    
      treeBaseStore.appendRootNode(demoRootNode);
      treeBaseStore.mapTreeDataToStyledTreeData();
      
      loadedOnce = true;
    }

  }, [])
  

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    //console.log('Trigger Select', keys, info);
    treeBaseStore.setCurrentSelectedTreeNodeKey(keys[0] as number)
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  
  return (
    <DirectoryTree      
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={toJS(treeBaseStore.styledTreeData)}
    />
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
