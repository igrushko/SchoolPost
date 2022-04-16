import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import api from "../../utils/Api";

export const PostEditForm = ({
  visible,
  onEdit,
  onCancel,
  _id,

}) => {
  const [values, setValues] = useState({});
  const [formChanged, setFormChanged] = useState(false);

  useEffect(() => {
    api.getPostById(_id).then((values) => {
      values = {...values, tags: values.tags.join()}
      setValues(values);
    });
  }, []);

  function onValuesChange(value) {
    setFormChanged(true);
  }

  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Edit this post"
      okText="Edit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            if (formChanged) {
                form.resetFields();
                onEdit(values);
            } else {
               onCancel();
            }
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
        onValuesChange = {onValuesChange}
        initialValues={{
          title: values.title,
          image: values.image,
          text: values.text,
          tags: values.tags,
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
            { type: "string", min: 2 },
            { whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="text"
          label="Text"
          rules={[
            {
              required: true,
            },
            { whitespace: true },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Input link to image" />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Input placeholder="legendary, cool, kife" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
