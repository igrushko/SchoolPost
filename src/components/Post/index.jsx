import React from "react";
import { List, Avatar, Typography, Timeline, Collapse, Image } from "antd";
import { MessageOutlined, HeartTwoTone } from "@ant-design/icons";
import dayjs from "dayjs";
import { IconText } from "../IconText";
import { Link } from "react-router-dom";

const { Panel } = Collapse;
const { Title } = Typography;

export const Post = ({
  onPostLike,
  image,
  likes,
  comments,
  _id,
  title,
  author: { avatar, name },
  text,
  created_at,
}) => {
  const dataFormated = dayjs(created_at).format("dddd, MMMM D, YYYY h:mm A");

  function handleLikeClick() {
    onPostLike({ _id, likes });
  }

  function handleCommentClick() {
    console.log("comment click");
  }

  function ImageDemo() {
    return <Image width={400} src={image} />;
  }
  return (
    <List.Item
      key={_id}
      actions={[
        <IconText
          likes={likes}
          icon={HeartTwoTone}
          twoToneColor="#eb2f96"
          defColor="gray"
          text={likes.length}
          key="list-vertical-like-o"
          onClick={handleLikeClick}
        />,
        <IconText
          likes={likes}
          defColor="gray"
          icon={MessageOutlined}
          text={comments.length}
          twoToneColor="#eb2f96"
          key="list-vertical-message"
          onClick={handleCommentClick}
        />,
      ]}
      extra={<ImageDemo />}
    >
      <Link className="link_card" to={`/card/${_id}`}>
        <List.Item.Meta avatar={<Avatar src={avatar} />} title={name} />       
        <Timeline>
          <Timeline.Item color="green">Create {dataFormated}</Timeline.Item>
        </Timeline>
        <Title level={4} style={{ margin: "10px 0" }}>
          {title}
        </Title>
      </Link>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header={`${text.slice(0, 50)}...`} key="2">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </List.Item>
  );
};
