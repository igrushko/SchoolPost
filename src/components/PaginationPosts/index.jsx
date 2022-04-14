import React from "react";
import { Pagination } from "antd";

export const PaginationPosts = ({
  page,
  pageLimit,
  setPage,
  totalPostQty,
  setPageLimit,
}) => {
  function onShowSizeChange(pageNumber, pageSize) {
        setPageLimit(pageSize);
  }
  return (
    <>
      <Pagination
        pageSize={pageLimit}
        total={totalPostQty}
        showSizeChanger
        showQuickJumper
        pageSizeOptions={[3, 5, 10, 15, 20]}
        showTotal={(total) => `Total ${total} posts`}
        onChange={(num) => setPage(num)}
        current={page}
        onShowSizeChange={onShowSizeChange}      
      />
    </>
  );
};
