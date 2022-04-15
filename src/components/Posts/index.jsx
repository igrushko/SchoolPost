import React, { useContext } from "react";
import { Post } from "../Post";
import { List } from "antd";
import { CurrentUserContext } from "../../context/currentUserContext";

export const Posts = ({ postsData, onPostLike }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
   
      {currentUser && ( 
     
        <List         
        // grid={{
        //   gutter: 16,
        //   xs: 1,
        //   sm: 2,
        //   md: 4,
        //   lg: 4,
        //   xl: 6,
        //   xxl: 3,
        // }}      
          itemLayout="vertical"
          size="small"
          dataSource={postsData}
          renderItem={(item) => ( 
            <Post key={item._id} {...item} onPostLike={onPostLike} />
          )}
        />
      )} 
    
     
    </>
  );
};
