import React, { useState } from "react";
import { Space } from "antd";
import s from "./styles.module.css";
import { setTwoToneColor } from "@ant-design/icons";

export const IconText = ({ icon, text, onClick, twoToneColor, currentUserId, likes }) => {
  
    let defaultColor = '';
    const isLike = likes.some(id => id === currentUserId);
    if (isLike) {
        defaultColor = twoToneColor}  
    else {
        defaultColor = 'gray'};
  const [iconColor, setIconColor] = useState(defaultColor);
  
  return (
    <Space className={s.space} onClick={() => {
        const isLike = likes.some(id => id === currentUserId);
        if (isLike) {
            setIconColor('gray')} 
        else {
            setIconColor(twoToneColor)};
        {onClick()}
        }}>
      {React.createElement(icon)}
      {setTwoToneColor(iconColor)}
      {text}
    </Space>
  );
};

