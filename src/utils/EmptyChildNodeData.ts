import { TreeDataType } from "../Types/TreeData";

export const EmptyChildNodeData = (parentId : number) : TreeDataType => {
    return {
        id: parentId + Number(new Date()),
        name: "loading...",
        description: undefined,
        parentId: undefined,
        hasChildren: false,
        children: undefined
    }
}