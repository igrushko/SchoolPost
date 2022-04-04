import React, { useState, useContext } from "react";
import { Post } from "../Post";
import { List } from "antd";
import { CurrentUserContext } from "../../context/currentUserContext";

export const Posts = ({ postsData, onPostLike }) => {
  const [rows, setRows] = useState(3);
  const currentUser = useContext(CurrentUserContext);
  function onShowSizeChange(pageNumber, pageSize) {
        setRows(pageSize);       
  }


  return (
    <>
      {currentUser && <List
        itemLayout="vertical"
        size="small"
        dataSource={postsData}
        renderItem={(item) => (
          <Post key={item._id} {...item} onPostLike={onPostLike} />
        )}
        pagination={{
          pageSize: rows,
          pageSizeOptions: [3, 5, 10, 25],
          showSizeChanger: true,
          onShowSizeChange: onShowSizeChange,
        }}
      />
}
    </>
  );
};
