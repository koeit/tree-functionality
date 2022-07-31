export type TreeDataType = {
    id: number;
    name: string;
    description?: string;
    parentId?: number;
    children: TreeDataType[];
}