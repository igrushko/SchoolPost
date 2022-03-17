import React from "react";
import { List, Avatar, Space, Typography, Timeline, Tag } from "antd";
import { MessageOutlined, HeartOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { postData } from "../../posts";
const { Title } = Typography;

export const Post = ({
  rows = 1,
  image,
  likes,
  tags,
  _id,
  title,
  author: { avatar, name, email },
  text,
  created_at,
  updated_at,
}) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const dataFormated = dayjs(created_at).format("dddd, MMMM D, YYYY h:mm A");
  const dataFormatedUp = dayjs(updated_at).format("dddd, MMMM D, YYYY h:mm A");
  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={{
         onChange: (page) => {
          console.log(page);
        },
        pageSize: rows,
        defaultPageSize: "20", 
        showSizeChanger: true, 
        pageSizeOptions: [20, 50, 100],
      }}
      dataSource={postData}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              icon={HeartOutlined}
              text={likes}
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ]}
          extra={<img width={272} alt="logo" src={image} />}
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
          {text}
        </List.Item>
      )}
    />
  );
};
