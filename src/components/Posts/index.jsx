import React from "react";
import { Post } from '../Post';
import { List } from "antd";
import { postData } from "../../posts";



export const Posts = () => { 
  
  return (        
      <>  
      <List
      itemLayout="vertical"
      size="small"
      dataSource={postData}
      renderItem={(item) => (      
        <Post key={item._id} {...item} />)} 
        pagination={{
          pageSize: 2,
          onChange: page => {
            console.log(page);
          },
    
      }}
        />
        
      </>        
  );
};  