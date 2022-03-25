import React from "react";
import { List, Avatar, Typography, Timeline, Tag, Collapse } from "antd";
import {
  MessageOutlined,
  HeartTwoTone,
  DeleteOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import { IconText } from "../IconText";
import api from "../../utils/Api"; 

const { Panel } = Collapse;
const { Title } = Typography;

export const Post = ({
  currentUserId,
  onPostLike,
  image,
  likes,
  comments,
  tags,
  _id,
  title,
  author: { avatar, name, email },
  text,
  created_at,
  updated_at,
}) => {

  const dataFormated = dayjs(created_at).format("dddd, MMMM D, YYYY h:mm A");
  const dataFormatedUp = dayjs(updated_at).format("dddd, MMMM D, YYYY h:mm A");

  
  function handleLikeClick() {
    onPostLike({ _id, likes });
  }

  function handleDeleteClick() {
    api.deletePost(_id);
  }

  function handleCommentClick() {
    console.log("comment click");
  }

  return (
    <List.Item
      key={_id}
      actions={[
        <IconText
          currentUserId={currentUserId}
          likes={likes}
          icon={HeartTwoTone}
          twoToneColor='#eb2f96'
          defColor='gray'
          text={likes.length}
          key="list-vertical-like-o"
          onClick={handleLikeClick}
        />,
        <IconText
         currentUserId={currentUserId}
          likes={likes}
          defColor='gray'
          icon={MessageOutlined}
          text={comments.length}
          twoToneColor='#eb2f96'
          key="list-vertical-message"
          onClick={handleCommentClick}
        />,
        <IconText
        currentUserId={currentUserId}
         likes={likes}
         defColor='gray'
         icon={DeleteOutlined}
         
         twoToneColor='#eb2f96'
         key="list-vertical-message"
         onClick={handleDeleteClick}
       />,
      ]}
      extra={<img width={400} alt="logo" src={image} />}
    >
      <Tag>{tags}</Tag>
      <Title level={5} style={{ margin: "20px 0" }}>
        {title}
      </Title>
      <Timeline>
        <Timeline.Item>Create {dataFormated}</Timeline.Item>
        <Timeline.Item color="green">
          Last update {dataFormatedUp}
        </Timeline.Item>
      </Timeline>

      <List.Item.Meta
        avatar={<Avatar src={avatar} />}
        title={<a href="#">{name}</a>}
        description={email}
      />
      <Collapse defaultActiveKey={["1"]}>
        <Panel header={`${text.slice(0, 50)}...`} key="2">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </List.Item>
  );
};
