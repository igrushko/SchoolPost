import React, { useContext, useCallback } from "react";
import { Col, Row } from "antd";
import { PostButton } from "../../components/PostButton";
import api from "../../utils/Api";
import { BreadcrumbTitle } from "../../components/BreadcrumbTitle";
import { PostPage } from "../../components/PostPage";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "./../../hooks/useApi";
import { NotFound } from "../../components/NotFound/NotFound";
import { SkeletonCard } from "../../components/SkeletonCard/SkeletonCard";

export const PostCardPage = ({ handlePostLike, posts }) => { 
  const { postID } = useParams();
  const navigate = useNavigate();


  function handlClickBack() {
    navigate(-1);
  }

  const handler = useCallback(() => {
    return api.getPostById(postID);
  }, [postID, posts]);

  const { data: post, loading, error } = useApi(handler);
 
 
  return (
    <>
      {!error && (
        <>
          <BreadcrumbTitle handlClickBack={handlClickBack} />
          <PostButton />
          
          <Row>
            <Col span={18} offset={0}>
              <div className="site-layout-content">
              {post && (
                <PostPage
                  {...post}
                  posts = {posts}
                  onPostLike={handlePostLike}
                  handlClickBack={handlClickBack}
                />
              )} 
              </div>
            </Col>
          </Row>
         
        </>
      )}
      {error && (
        <NotFound
          title="Post not found"
          buttonText="All Post"
          buttonAction={() => navigate("/")}
        />        
      )}
      {loading && (<SkeletonCard/>)}
    </>
  );
};
