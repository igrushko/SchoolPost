import React, {useContext} from "react";
import { Col, Row, Space } from "antd";
import { Posts } from "../../components/Posts";
import { PostButton } from "../../components/PostButton";
import { CurrentUserContext } from "../../context/currentUserContext";

export const PostsListPage = ({ posts, handlePostLike }) => {
  const currentUser = useContext(CurrentUserContext)
  return (
    <>
    <Space direction="vertical" style={{ display: 'flex' }}>
       <PostButton/> 
     
      <Row>
      
        <Col span={20} offset={0}>
          <div className="site-layout-content">
            {currentUser._id && <Posts
              postsData={posts}
              onPostLike={handlePostLike}              
            />}
          </div>
        </Col>
      </Row>  
      </Space>
    </>
  );
};
