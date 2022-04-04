import React, { useState,  useContext } from "react";
import { Space } from "antd";
import s from "./styles.module.css";
import { setTwoToneColor } from "@ant-design/icons";
import { CurrentUserContext } from "../../context/currentUserContext";

export const IconText = ({ icon, text, onClick, twoToneColor, likes }) => {
  const currentUser = useContext(CurrentUserContext)

    let defaultColor = '';
    const isLike = likes.some(id => id === currentUser._id);
    if (isLike) {
        defaultColor = twoToneColor}  
    else {
        defaultColor = 'gray'};
  const [iconColor, setIconColor] = useState(defaultColor);
  
  return (
    <Space className={s.space} onClick={() => {
       const isLike = likes.some(id => id === currentUser._id);
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

