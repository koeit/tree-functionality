import { Button, Form, Input } from 'antd';
import { observer } from 'mobx-react';
import treeBaseStore from '../Store/TreeBaseStore';

function ShowSelectedTreeNodeInfoItems() {
  const [form] = Form.useForm<{}>();

  return (
    <>
      {treeBaseStore.currentSelectedTreeNodeKey !== 0 ? 
        <Form form={form} name="useForm" layout="vertical">
          <Form.Item name="child_node" noStyle>
              <Input
                prefix="Child Node:"
                style={{ width: "calc(100% - 200px)" }}
                size="middle"
                placeholder="node name"
              />
          </Form.Item>
          <Button
            htmlType="button"
            type="default"
            size="middle"
            style={{ width: "200px" }}
            onClick={() => {
              // Here you should create a new root node data in the backend and use it´s return id
              // I don´t use a backend in this project so i use new Date() as a number
              const backendReturnId : number = Number(new Date());

              treeBaseStore.createAndAppendChildNode(backendReturnId, form.getFieldValue("child_node"), undefined);
            
              treeBaseStore.mapTreeDataToStyledTreeData();
            }}
          >
            Add
          </Button>
        </Form>
      : null}
    </>
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
