import React, {useContext} from "react";
import {
  Avatar,
  Typography,
  Timeline,
  Tag,  
  Card,
  Row,
  Col,
} from "antd";
import {
  MessageOutlined,
  HeartTwoTone,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { IconText } from "../IconText";
import api from "../../utils/Api";
import { CurrentUserContext } from "../../context/currentUserContext";
import { Navigate, useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Title } = Typography;
const gridStyle = {
  width: "50%",
  textAlign: "left",
};

export const PostPage = ({
  author: { _id: author_id, name, email, avatar },
  onPostLike,
  handlClickBack,
  image,
  likes,
  comments,
  tags,
  _id,
  title,
  text,
  created_at,
  updated_at,  
}) => {
  const dataFormated = dayjs(created_at).format("dddd, MMMM D, YYYY h:mm A");
  const dataFormatedUp = dayjs(updated_at).format("dddd, MMMM D, YYYY h:mm A");
  const currentUser = useContext(CurrentUserContext);
  const isCurrentUser = currentUser._id === author_id;
  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);    
}

  function handleLikeClick() {
    onPostLike({ _id, likes });
  }

  function handleDeleteClick() {
    api.deletePost(_id)
    .then  (refreshPage)
  }
  

  function handleCommentClick() {
    console.log("comment click");
  }
  return (
    <>
      <Row justify="end">
        <Col offset={1}>
          <a href="#" onClick={handlClickBack}>
            Back
          </a>
        </Col>
      </Row>

      <Card
        style={{ width: "100%" }}
        key={_id}
        actions={[
          <IconText
            currentUser={currentUser}
            likes={likes}
            icon={HeartTwoTone}
            twoToneColor="#eb2f96"
            defColor="gray"
            text={likes.length}
            key="list-vertical-like-o"
            onClick={handleLikeClick}
          />,
          <IconText
            // currentUser={currentUser}
            likes={likes}
            defColor="gray"
            icon={MessageOutlined}
            text={comments.length}
            twoToneColor="#eb2f96"
            key="list-vertical-message"
            onClick={handleCommentClick}
          />,
          isCurrentUser ? (
            <IconText
              // currentUser={currentUser}
              likes={likes}
              defColor="gray"
              icon={DeleteOutlined}
              twoToneColor="#eb2f96"
              key="list-vertical-message"
              onClick={handleDeleteClick}
            />
          ) : (
            <></>
          ),
        ]}
      >
        <Card.Grid style={gridStyle}>
          {<img style={{width:"100%"}} alt="logo" src={image} />}

          <Title level={4} style={{ margin: "20px 0" }}>
            {title}
          </Title>
          <Meta
            style={{ margin: "20px 0" }}
            avatar={<Avatar src={avatar} />}
            title={name}
            description={email}
          />

          <Timeline>
            <Timeline.Item>Create {dataFormated}</Timeline.Item>
            <Timeline.Item color="green">
              Last update {dataFormatedUp}
            </Timeline.Item>
          </Timeline>

          <Tag>{tags}</Tag>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <p>{text}</p>
        </Card.Grid>
      </Card>
    </>
  );
};
