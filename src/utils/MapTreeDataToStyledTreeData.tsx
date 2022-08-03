import { DataNode } from 'antd/lib/tree'
import { TreeDataType } from '../Types/TreeData';

const goThroughEveryNodeInTreeData = (currentTreeData: TreeDataType[]) : DataNode[] => {
    let styledTreeData: DataNode[] = []

    currentTreeData.forEach(node => {
        if (node.hasChildren) {
            styledTreeData.push({
                title: <span style={{color: "red"}}>{node.name}</span>, key: node.id, selectable: true, children: goThroughEveryNodeInTreeData(node.children!)
            })
        } else {
            styledTreeData.push({
                title: <span style={{color: "blue"}}>{node.name}</span>, key: node.id, selectable: true, children: []
            })
        }
    });

    return styledTreeData
}

export default function MapTreeDataToStyledTreeData(currentTreeData: TreeDataType[]) : DataNode[] {
  return goThroughEveryNodeInTreeData(currentTreeData);
}
