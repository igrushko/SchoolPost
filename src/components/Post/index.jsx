import React from "react";
import { List, Avatar, Space, Typography, Timeline, Tag, Collapse } from "antd";
import { MessageOutlined, HeartOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const { Panel } = Collapse;
const { Title } = Typography;

export const Post = ({
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
    <List.Item
      key={_id}
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
      <Collapse defaultActiveKey={["1"]} >
        <Panel header={`${text.slice(0,50)}...`} key="2">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </List.Item>
  );
};
