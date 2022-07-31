import { Button, Form, Input } from "antd";
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
            alert(form.getFieldValue("root_node"))
          }}
        >
          Add
        </Button>
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
            alert(form.getFieldValue("child_node"))
          }}
        >
          Add
        </Button>
      </Form>
    </>
  );
}
