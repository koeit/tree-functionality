import { Button, Form, Input } from "antd";
import treeBaseStore from "../Store/TreeBaseStore";
import "./CreateNewTreeNodes.css";

export default function CreateNewTreeNodes() {
  const [form] = Form.useForm<{}>();

  return (
    <>
      <h2>Add Tree Nodes</h2>
      <Form form={form} name="useForm" layout="vertical">
        <Form.Item name="root_node" noStyle>
            <Input
              prefix="Root Node:"
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
            treeBaseStore.createAndAppendRootNode(backendReturnId, form.getFieldValue("root_node"))

            // map everything
            treeBaseStore.mapTreeDataToStyledTreeData();
          }}
        >
          Add
        </Button>
      </Form>
    </>
  );
}
