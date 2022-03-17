import React from "react";
import { Post } from '../Post';



export const Posts = ({postsData}) => {    
  return (                   
       <>
        
        {postsData.map(item => <Post key={item._id} {...item} />)}
        
       </>        
  );
};  