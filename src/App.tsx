import './App.css';
import TreeBase from './Components/TreeBase';
import CreateNewTreeNodes from './Components/CreateNewTreeNodes';
import ShowSelectedTreeNodeInfo from './Components/ShowSelectedTreeNodeInfo';
import { observer } from 'mobx-react';
import treeBaseStore from './Store/TreeBaseStore';

function AppItems() {
  return (
    <>
      <div 
        onMouseDown={() => {
          if(!treeBaseStore.isMouseOver){
            treeBaseStore.setCurrentSelectedTreeNodeKey(0);
          }
        }}
      >
        <CreateNewTreeNodes />
      </div>
      <ShowSelectedTreeNodeInfo />
      <TreeBase />
    </>
  );
}

const AppItemsObserver = observer(AppItems);

export default function App() {
    return (
        <>
            <AppItemsObserver />
        </>
    )
}
