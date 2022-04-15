import React, { useContext, useState } from "react";
import { Avatar, Typography, Timeline, Tag, Card, Row, Col, Image, Modal } from "antd";
import {
  MessageOutlined,
  HeartTwoTone,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import { IconText } from "../IconText";
import api from "../../utils/Api";
import { CurrentUserContext } from "../../context/currentUserContext";
import { useNavigate } from "react-router-dom";
import { PostEditForm } from "../PostEditForm/PostEditForm";


const { confirm } = Modal;
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
  setPosts,
  posts  
}) => {
  const dataFormated = dayjs(created_at).format("dddd, MMMM D, YYYY h:mm A");
  const dataFormatedUp = dayjs(updated_at).format("dddd, MMMM D, YYYY h:mm A");
  const currentUser = useContext(CurrentUserContext);
  const isCurrentUser = currentUser._id === author_id;
  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };
  const [visible, setVisible] = useState(false);
  
  const onEdit = (values) => {  
   values = {...values, tags: values.tags?.split(",").map(tag => tag?.trim()).filter(tag => tag !== "")}  
    api.editPostById(_id, values) 
    .then((newPost) => {     
      const newPosts = posts.map(p => p._id === newPost._id ? newPost : p);
      setPosts(newPosts);      
     });
   setVisible(false);  
 }            
 
  function handleLikeClick() {
    onPostLike({ _id, likes });
  }

  function showDeleteConfirm() {
    confirm({
      title: 'Are you sure delete this post?',
      icon: <ExclamationCircleOutlined />,      
      okText: 'Yes',
      cancelText: 'No',
      onOk() {       
    api.deletePost(_id).then(refreshPage);  
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  

  function handleCommentClick() {
    console.log("comment click");
  }

  function ImageDemo() {
    return (
      <Image
        width={"100%"}
        src={image}
      />
    );
  }
 
  return (
    <>
      <Row justify="space-between" align="middle" style={{ padding: "10px 0" }}> 
        <Col>
        {tags?.map((item, index) => <Tag key={index}> {item}</Tag>)}
        </Col>
        <Col >
          <a onClick={handlClickBack}>
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
           
              likes={likes}
              defColor="gray"
              icon={EditOutlined}
              twoToneColor="#eb2f96"
              key="list-vertical-message"
              onClick={() => {
                setVisible(true);
              }}
            />
          ) : (
            <></>
          ),
          isCurrentUser ? (
            <IconText             
              likes={likes}
              defColor="gray"
              icon={DeleteOutlined}
              twoToneColor="#eb2f96"
              key="list-vertical-message"
              onClick={showDeleteConfirm}
            />
          ) : (
            <></>
          ),
         
        ]}
        title={[
          <Row key={dataFormatedUp.toString} justify="space-between" align="middle">
            <Col> 
            <Meta
            key={name}           
            style={{ margin: "20px 0" }}
            avatar={<Avatar src={avatar} />}
            title={name}
            description={email}
          />
          <Timeline key={dataFormated.toString}>
            <Timeline.Item>Create {dataFormated}</Timeline.Item>
            <Timeline.Item color="green">
              Last update {dataFormatedUp}
            </Timeline.Item>
          </Timeline> 
            </Col>
           <Col>
           <Title key={_id} level={3} style={{ paddingRight: "20px" }}>
            {title}
          </Title>
           </Col>
          </Row> 
        ]}        
      >
        <Card.Grid style={gridStyle}>
         <ImageDemo/>
       
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <p>{text}</p>
        </Card.Grid>
      </Card>

      <PostEditForm      
       visible={visible}
       onEdit={onEdit}
       _id={_id}
       onCancel={() => {
         setVisible(false);
       }}
     />
    </>
  );
};
