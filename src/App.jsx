import React from "react";
import "./index.css";
import { Layout, Breadcrumb, Col, Row } from "antd";
const { Header, Content, Footer } = Layout;
import { HeaderTitle } from "./components/HeaderTitle";
import { Posts } from "./components/Posts";
import { FooterText } from "./components/Footer";
export const App = () => {
 
  
  return (
    <>
      <Layout>
        <Header style={{ backgroundColor: "#0099FF" }}></Header>

        <Content style={{ padding: "0 100px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>All Posts</Breadcrumb.Item>
          </Breadcrumb>
          <HeaderTitle />         
          <Row>
            <Col span={18} offset={0}>
              <div className="site-layout-content">
                
                <Posts  />
              </div>
            </Col>
          </Row>
         
        </Content>
        <Footer style={{ textAlign: 'center' }}>          
            <FooterText/>          
        </Footer>
      </Layout>
    </>
  );
};
