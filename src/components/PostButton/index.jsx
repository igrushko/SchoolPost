import React from "react";
import { Button } from "antd";
import { PostCreateForm } from "../PostCreateForm/PostCreateForm";

export const PostButton = ({onCreate, visible, setVisible}) => {


  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        
        size="large"
        onClick={() => {
          setVisible(true);
        }}
      >
        Create Post
      </Button>
      <PostCreateForm
       visible={visible}
       onCreate={onCreate}
       onCancel={() => {
         setVisible(false);
       }}
     />
    </>
  );
};


  

 
