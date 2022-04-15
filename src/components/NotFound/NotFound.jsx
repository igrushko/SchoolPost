import React from "react";
import { Button, Result } from "antd";
export const NotFound = ({ buttonText, buttonAction, title}) => {
  return (
    <>
      <Result
    status="404"
    title="404"
    subTitle={title}
    extra={<Button type="primary" onClick={buttonAction}>{buttonText}</Button>}
  />    
    </>
  );
};
