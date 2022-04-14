import React, { useState, useEffect } from "react";
import "./index.css";
import { Layout, Space, Typography, Button, Row, Col } from "antd";
const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;
import { HeaderTitle } from "./components/HeaderTitle";
import { FooterText } from "./components/Footer";
import { CurrentUserContext } from "./context/currentUserContext";
import api from "./utils/Api";
import { PostsListPage } from "./pages/PostsListPage/PostsListPage";
import { PostCardPage } from "./pages/PostCardPage/PostCardPage";
import { Route, Routes, useLocation } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { PostCreateForm } from "./components/PostCreateForm/PostCreateForm";
import { PaginationPosts } from "./components/PaginationPosts";
import { BreadcrumbTitle } from "./components/BreadcrumbTitle";
import { PostButton } from "./components/PostButton";

export const App = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(3);
  const [totalPostQty, setTotalPostQty] = useState(0);
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Promise.all([api.getPostsList(page, pageLimit), api.getUserInfo()]).then(
      ([postData, userData]) => {
        setPosts(postData.posts);
        setTotalPostQty(postData.total);
        setCurrentUser(userData);
      }
    );
  }, [page, pageLimit]);

  function handlePostLike({ _id, likes }) {
    const isLiked = likes.some((id) => id === currentUser._id);
    api.changeLikeStatus(_id, isLiked).then((newPost) => {
      const newPostsState = posts.map((p) => {
        return p._id === newPost._id ? newPost : p;
      });
      setPosts(newPostsState);
    });
  }

  const onCreate = (values) => {
    values = {
      ...values,
      tags: values.tags?.split(",").map((tag) => tag.trim()),
    };
    api.addPost(values).then((newUserPost) => {
      setPosts((prevState) => [...prevState, newUserPost]);
    });

    setVisible(false);
  };
 
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Layout>
        <HeaderTitle />

        <Content style={{ padding: "0 100px" }}>
          <BreadcrumbTitle />
          <PostButton
            onCreate={onCreate}
            visible={visible}
            setVisible={setVisible}
          />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ display: "flex" }}
                  >
                    <PostsListPage
                      posts={posts}
                      setPosts={setPosts}
                      handlePostLike={handlePostLike}
                    />
                    <PaginationPosts
                      page={page}
                      pageLimit={pageLimit}
                      totalPostQty={totalPostQty}
                      setPage={setPage}
                      setPageLimit={setPageLimit}
                    />
                  </Space>
                </>
              }
            />

            <Route
              path="/card/:postID"
              element={
                <PostCardPage
                  posts={posts}
                  handlePostLike={handlePostLike}
                  setPosts={setPosts}
                />
              }
            />

            <Route
              path="*"
              element={<NotFoundPage style={{ textAlign: "center" }} />}
            />
          </Routes>

          <PostCreateForm />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <FooterText />
        </Footer>
      </Layout>
    </CurrentUserContext.Provider>
  );
};
