import React, { useEffect, useState } from 'react';
import { Modal, Form, Input } from 'antd';
import api from '../../utils/Api';



export const PostEditForm = ({ visible, onEdit, onCancel, _id }) => {
 
  const [values, setValues] = useState({});
  
  useEffect(() => {
    api.getPostById(_id)
    .then (values => {
      setValues(values);
    })  
  }, []);  

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
            form.resetFields();
            onEdit(values);
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
         title: values.title,
         image: values.image,
         text: values.text,
         tags: values.tags,
        }}
      >
        <Form.Item
        name="title"          
          label="Title"
        >
          <Input />
          </Form.Item>

          <Form.Item
          name="text" 
          label="Text" 
         >          
         <Input.TextArea />
      </Form.Item>    

      <Form.Item 
      label="Image"
       name = "image"
       >       
      
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

