import React from 'react';
import { Modal, Form, Input } from 'antd';

export const PostCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
    return (
    <Modal
      visible={visible}
      title="Create a new post"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
        name="title"          
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of your post',
            },
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
              message: 'Please input the text of your post',
            },
          ]}>          
         <Input.TextArea />
      </Form.Item>    

      <Form.Item 
      label="Image"
       name = "image"
       rules={[
        {
          required: true,
          message: 'Please input the link to the image of your post',
        },
        { type: 'url', warningOnly: true }, 
        { type: 'string', min: 6 }
      ]}>       
      
        <Input  placeholder="Input link to image" />
        </Form.Item>

         <Form.Item 
         label="Tags"
         name = "tags">
        <Input  placeholder="legendary, cool, kife" />
        </Form.Item>       
      
      </Form>
    </Modal>
  );
};

