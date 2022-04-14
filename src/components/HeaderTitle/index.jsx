import React, { useContext, useState } from "react";
import { Typography, Space, Row, Col, Button, Layout, Avatar } from "antd";
import { CurrentUserContext } from "../../context/currentUserContext";
import { ChangeAvatarForm } from "../ChangeAvatarForm";
import api from "../../utils/Api";
const { Header } = Layout;
const { Title, Text } = Typography;

export const HeaderTitle = () => {
  const [visible, setVisible] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const onChangeAvatar = (values) => {
    api.changeAvatar(values);
    setVisible(false);
  };
  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "#0099FF",
          lineHeight: "20px",
          padding: "0 100px",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col span={10} offset={0}>
            <Title level={4} style={{ color: "#FFFFFF" }}>
              {currentUser.name}
            </Title>
            <Text style={{ color: "#FFFFFF" }}>{currentUser.about}</Text>
          </Col>

          <Col span={4} offset={0}>
            <Button
              onClick={() => {
                setVisible(true);
              }}
            >
              Change Avatar
            </Button>
            <ChangeAvatarForm
              visible={visible}
              onChangeAvatar={onChangeAvatar}
              onCancel={() => {
                setVisible(false);
              }}
            />
          </Col>
        </Row>
      </Header>
      <Space direction="horizontal" style={{ padding: "10px 100px" }}>
        <Avatar size={120} src={currentUser.avatar} />
        <Title style={{ paddingLeft: "30px" }} level={3}>
          Welcome to Your Zen!
        </Title>
        <Title level={4}>Relax and write your posts</Title>
              </Space>
    </Layout>
  );
};
