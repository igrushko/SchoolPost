import React, { useState, useEffect } from "react";
import "./index.css";
import { Layout, Breadcrumb, Col, Row, Typography } from "antd";
const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;
import { HeaderTitle } from "./components/HeaderTitle";
import { Posts } from "./components/Posts";
import { FooterText } from "./components/Footer";
import api from "./utils/Api"; 




export const App = () => {
const [posts, setPosts] = useState([])
const [currentUser, setCurrentUser] = useState({})

  useEffect(()=> {
    Promise.all([api.getPostsList(), api.getUserInfo()])
     .then(([postData, userData]) => {
      setPosts(postData);
      setCurrentUser(userData);
        })
      }, [])
      

     function handlePostLike ({_id, likes}) {
       const isLiked = likes.some(id => id === currentUser._id)
        api.changeLikeStatus(_id, isLiked)
       .then((newPost) =>{
         const newPostsState = posts.map(p => {
           return p._id === newPost._id ? newPost : p
         })
         setPosts(newPostsState);
       })
     } 
  

  return (
    <>
      <Layout>
        <Header style={{ backgroundColor: "#0099FF", lineHeight: "10px", padding: "0 100px" }}>
        <Title level={4} style={{color: "#FFFFFF"}} >{currentUser.name}</Title>
        <Text style={{color: "#FFFFFF"}} >{currentUser.about}</Text>
        </Header>

        <Content style={{ padding: "0 100px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>All Posts</Breadcrumb.Item>
          </Breadcrumb>
          <HeaderTitle />         
          <Row>
            <Col span={18} offset={0}>
              <div className="site-layout-content">
                
                <Posts postsData={posts} onPostLike = {handlePostLike} currentUserId = {currentUser._id}/>
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
