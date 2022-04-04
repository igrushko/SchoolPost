import React, { useContext } from "react";
import { List, Avatar, Typography, Timeline, Collapse } from "antd";
import { MessageOutlined, HeartTwoTone } from "@ant-design/icons";
import dayjs from "dayjs";
import { IconText } from "../IconText";
import api from "../../utils/Api";
import { Link } from "react-router-dom";
//import { CurrentUserContext } from "../../context/currentUserContext";

const { Panel } = Collapse;
const { Title } = Typography;

export const Post = ({
  onPostLike,
  image,
  likes,
  comments,
  _id,
  title,
  author: { avatar, name, email },
  text,
  created_at,
}) => {
  //const currentUser = useContext(CurrentUserContext);
  const dataFormated = dayjs(created_at).format("dddd, MMMM D, YYYY h:mm A");

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
          //currentUser={currentUser}
          likes={likes}
          icon={HeartTwoTone}
          twoToneColor="#eb2f96"
          defColor="gray"
          text={likes.length}
          key="list-vertical-like-o"
          onClick={handleLikeClick}
        />,
        <IconText
          //currentUser={currentUser}
          likes={likes}
          defColor="gray"
          icon={MessageOutlined}
          text={comments.length}
          twoToneColor="#eb2f96"
          key="list-vertical-message"
          onClick={handleCommentClick}
        />,
      ]}
      extra={<img width={400} alt="logo" src={image} />}
    >
      <Link className="link_card" to={`/card/${_id}`}>
        <List.Item.Meta
          avatar={<Avatar src={avatar} />}
          title={name}
          description={email}
        />
        <Title level={5} style={{ margin: "20px 0" }}>
          {title}
        </Title>
        <Timeline>
          <Timeline.Item color="green">Create {dataFormated}</Timeline.Item>
        </Timeline>
      </Link>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header={`${text.slice(0, 50)}...`} key="2">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </List.Item>
  );
};
