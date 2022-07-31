
// https://www.youtube.com/watch?v=nGZCL6Wd_zQ
import { makeAutoObservable } from "mobx";
import { TreeDataType } from "../Types/TreeData";

class TreeBaseStore {
    
    treeData: TreeDataType[] = [];

    constructor(){
        makeAutoObservable(this)
    }

}
const treeBaseStore = new TreeBaseStore();
export default treeBaseStore;