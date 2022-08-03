import { observer } from 'mobx-react';

function ShowSelectedTreeNodeInfoItems() {
  return (
    <div>ShowSelectedTreeNodeInfo</div>
  )
}

const ShowSelectedTreeNodeInfoItemsObserver = observer(ShowSelectedTreeNodeInfoItems);

export default function ShowSelectedTreeNodeInfo() {
    return (
        <>
            <ShowSelectedTreeNodeInfoItemsObserver />
        </>
    )
}
