import React, { useState } from "react";
import "./index.css";
import { Layout, Breadcrumb, Col, Row } from "antd";
const { Header, Content, Footer } = Layout;
import { HeaderTitle } from "./components/Header";
import { Posts } from "./components/Posts";
import { postData } from "./posts";
import { FooterText } from "./components/Footer";

export const App = () => {
  const [posts, setPosts] = useState(postData);
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
                
                <Posts postsData={posts} />
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
