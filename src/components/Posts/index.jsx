import React, { useState, useContext } from "react";
import { Post } from "../Post";
import { List } from "antd";
import { CurrentUserContext } from "../../context/currentUserContext";

export const Posts = ({ postsData, onPostLike }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      {currentUser && (
        <List
          itemLayout="vertical"
          size="small"
          dataSource={postsData}
          renderItem={(item) => (
            <Post key={item._id} {...item} onPostLike={onPostLike} />
          )}
        />
      )}
    </>
  );
};
