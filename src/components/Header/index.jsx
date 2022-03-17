import React from "react";
import { Typography, Space } from "antd";
import { ButtonCreate } from "../Button";
const { Title } = Typography;

export const HeaderTitle = () => {
  return (
    
     <Space direction="vertical">    
      <Title level={3}>
        Welcome to Our Image Board!
      </Title>
      <Title level={5}>
        We're stoked that you're here.
      </Title>
      <ButtonCreate />    
     </Space>
    
  );
};
