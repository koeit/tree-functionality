
// https://www.youtube.com/watch?v=nGZCL6Wd_zQ
import { makeAutoObservable } from "mobx";

class TreeBaseStore {

    constructor(){
        makeAutoObservable(this)
    }

}
const treeBaseStore = new TreeBaseStore();
export default treeBaseStore;