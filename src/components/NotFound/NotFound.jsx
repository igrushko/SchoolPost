import React from "react";
import { Button, Col, Row, Space, Typography } from "antd";
const { Title } = Typography;
import { MehOutlined } from "@ant-design/icons";

export const NotFound = ({ children, title, buttonText, buttonAction}) => {
  return (
    <>
    <Space direction="vertical" size="middle" style={{ display: 'flex', verticalAlign: "midle", paddingTop: "20%", paddingBottom: "20%"}}>  
    <Row justify="space-around" align="bottom"> 
        <Col>
          <MehOutlined style={{ fontSize: "64px", verticalAlign: 'middle' }} />
          </Col>
          </Row>
      <Row justify="space-around" align="bottom"> 
        <Col>
        <Title>{title}</Title> 
          </Col>
          </Row>       
        {children}
        <Row justify="space-around" align="bottom"> 
        <Col>
        <Button type="primary"
        
              
        size="large"
        onClick={buttonAction}>{buttonText}</Button>
          </Col>
          </Row>
       </Space>
    </>
  );
};
