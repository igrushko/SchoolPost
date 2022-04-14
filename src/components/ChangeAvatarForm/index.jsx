import React from "react";
import { Modal, Form, Input } from "antd";

export const ChangeAvatarForm = ({ visible, onChangeAvatar, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Change my Avatar"
      okText="Change"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onChangeAvatar(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="avatar"
          label="Avatar"
          rules={[
            {
              required: true,
              message: "Please input the link to your new Avatar",
            },
            { type: "url", warningOnly: true },
            { type: "string", min: 6 },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
