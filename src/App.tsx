import './App.css';
import TreeBase from './Components/TreeBase';
import CreateNewTreeNodes from './Components/CreateNewTreeNodes';
import ShowSelectedTreeNodeInfo from './Components/ShowSelectedTreeNodeInfo';

function App() {
  return (
    <>
      <CreateNewTreeNodes />
      <ShowSelectedTreeNodeInfo />
      <TreeBase />
    </>
  );
}

export default App;
