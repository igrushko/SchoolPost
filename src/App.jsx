import React, { useState, useEffect } from "react";
import "./index.css";
import { Layout, Typography, Space } from "antd";
const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;
import { HeaderTitle } from "./components/HeaderTitle";
import { FooterText } from "./components/Footer";
import { CurrentUserContext } from  "./context/currentUserContext"
import api from "./utils/Api";
import { PostsListPage } from "./pages/PostsListPage/PostsListPage";
import { PostCardPage } from "./pages/PostCardPage/PostCardPage";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
//import { isLiked } from "./utils/utils";

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  
 

  useEffect(() => {
    Promise.all([api.getPostsList(), api.getUserInfo()])
    .then(
      ([postData, userData]) => {
        setPosts(postData);       
        setCurrentUser(userData);
      }
    );
  }, []);

  function handlePostLike({ _id, likes }) {
    const isLiked = likes.some(id => id === currentUser._id)
    api.changeLikeStatus(_id, isLiked)
      .then((newPost) => {
      const newPostsState = posts.map((p) => {
        return p._id === newPost._id ? newPost : p;
      });

       setPosts(newPostsState);
    });
  }

  return (
    
    <CurrentUserContext.Provider value = {currentUser}>
      <Layout>
        <Header
          style={{
            backgroundColor: "#0099FF",
            lineHeight: "10px",
            padding: "0 100px",
          }}
        >
          <Title level={4} style={{ color: "#FFFFFF" }}>
            {currentUser.name}
          </Title>
          <Text style={{ color: "#FFFFFF" }}>{currentUser.about}</Text>
        </Header>

        <Content style={{ padding: "20px 100px" }}>
         
            <HeaderTitle />
         

          <Routes>
             <Route
              path="/"
              element={
                <PostsListPage                  
                  posts={posts}
                  handlePostLike={handlePostLike}
                />
              
              }
            />
            
           <Route
              path="/card/:postID"
              element={
                <PostCardPage 
                posts={posts}                    
                handlePostLike={handlePostLike}
                />
              }
            />

            <Route path="*" element = {<NotFoundPage  style={{ textAlign: "center" }}/> }/>

          </Routes>

        </Content>
        <Footer style={{ textAlign: "center" }}>
          <FooterText />
        </Footer>
      </Layout>
    </CurrentUserContext.Provider>
  );
};
