import React, { useState } from "react";
import { Post } from "../Post";
import { List } from "antd";

export const Posts = ({ postsData, onPostLike, currentUserId }) => {
  const [rows, setRows] = useState(2);
  function onShowSizeChange(pageNumber, pageSize) {
    setRows(pageSize);
  }

  return (
    <>
    { currentUserId &&
      <List
        itemLayout="vertical"
        size="small"
        dataSource={postsData}
       renderItem={(item) => <Post key={item._id} {...item} onPostLike = {onPostLike} currentUserId = {currentUserId}/>}
        pagination={{
          pageSize: rows,
          pageSizeOptions: [2, 5, 10, 25],
          showSizeChanger: true,
          onShowSizeChange: onShowSizeChange,
        }}
      />}
    </>
  );
};
