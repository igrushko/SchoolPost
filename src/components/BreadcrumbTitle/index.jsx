import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export const BreadcrumbTitle = () => {
  const routes = [
    {
      path: "/",
      breadcrumbName: "Home",
    },

    {
      path: "/card/:postID",
      breadcrumbName: "Post",
    },
  ];
  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
    );
  }

  return (
    <Breadcrumb
      itemRender={itemRender}
      routes={routes}
      style={{ margin: "16px 0" }}
    />
  );
};
