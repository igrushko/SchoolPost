import React from "react";
import { Breadcrumb } from "antd";



export const BreadcrumbTitle = ({handlClickBack}) => {

  return (
    
    <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item onClick={handlClickBack}>All Posts</Breadcrumb.Item>
            <Breadcrumb.Item>Post</Breadcrumb.Item>
          </Breadcrumb>
    
  );
};
