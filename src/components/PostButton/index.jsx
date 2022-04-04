import React from "react";
import { Button } from "antd";

export const PostButton = () => {
   const handleClick = () => {
        console.log("Есть контакт");
    }
  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        
        size="large"
        onClick={handleClick}
      >
        Create Post
      </Button>
    </>
  );
};
