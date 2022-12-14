import { Button, Form, Input } from 'antd';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import treeBaseStore from '../Store/TreeBaseStore';
import { TreeDataType } from '../Types/TreeData';

function ShowSelectedTreeNodeInfoItems() {
  const [form] = Form.useForm<{}>();

  // fill textbox with existing node title
  useEffect(() => {
    const selectedTreeNodeKey: number = treeBaseStore.currentSelectedTreeNodeKey;
    if (selectedTreeNodeKey !== 0){
      form.setFieldValue("node_rename", treeBaseStore.getNodeTitleByKey(selectedTreeNodeKey))
    }
  }, [treeBaseStore.currentSelectedTreeNodeKey])
  

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
              treeBaseStore.sortTreeNodes(treeBaseStore.currentSelectedTreeNodeKey);

              treeBaseStore.mapTreeDataToStyledTreeData();
            }}
          >
            Add
          </Button>
          <Form.Item name="node_rename" noStyle>
              <Input
                prefix="Rename this node:"
                style={{ width: "calc(100% - 200px)" }}
                size="middle"
              />
          </Form.Item>
          <Button
            htmlType="button"
            type="default"
            size="middle"
            style={{ width: "200px" }}
            onClick={() => {
              const currentSelectedTreeNodeKey: number = treeBaseStore.currentSelectedTreeNodeKey;

              treeBaseStore.renameNodeByKey(
                currentSelectedTreeNodeKey, 
                form.getFieldValue("node_rename"));
              
                if (treeBaseStore.isCurrentSelectedTreeNodeARootNode()){
                  // sort root nodes
                  treeBaseStore.sortTreeNodes();
                } else { 
                  // sort child nodes
                  const childNodeInfo: TreeDataType | undefined = treeBaseStore.getNodeInfoByKey(currentSelectedTreeNodeKey);
                  
                  if (childNodeInfo !== undefined){
                    treeBaseStore.sortTreeNodes(childNodeInfo.parentId);
                  }
                }
            
              treeBaseStore.mapTreeDataToStyledTreeData();
            }}
          >
            Rename
          </Button>
          <Button
            htmlType="button"
            type="default"
            size="middle"
            style={{ width: "200px" }}
            onClick={() => {
              treeBaseStore.removeNodeByKey(
                treeBaseStore.currentSelectedTreeNodeKey);
            
              treeBaseStore.mapTreeDataToStyledTreeData();
            }}
          >
            Delete Selected Node
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
