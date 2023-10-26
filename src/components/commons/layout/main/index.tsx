import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import LayoutBanner from "../banner/LayoutBanner.container";
import { useRouter } from "next/router";

const { Content, Sider } = Layout;

// 게시판 이름 배열
const boardNames = ["자유 게시판", "여행지 추천", "주변 놀거리"];

const App: React.FC = () => {
  const router = useRouter();

  const items2: MenuProps["items"] = [
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  ].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: boardNames[index], // 게시판 이름

      children:
        index === 0 // 첫 번째 메뉴인 경우
          ? [
            {
              key: "1",
              label: "게시글 작성",
              onClick: async () => await router.push("/boards/new"),
            },
            {
              key: "2",
              label: "게시글 목록",
              onClick: async () => await router.push("/boards"),
            },
            {
              key: "3",
              label: "추천 많은 글",
              onClick: () => (window.location.href = "/recommended"),
            },
          ]
          : index === 1 // 두 번째 메뉴인 경우 (여행지 관련)
            ? [
              {
                key: "4",
                label: "여행지 추천",
                onClick: async () => await router.push("/travel/recommend"),
              },
              {
                key: "5",
                label: "여행지 후기",
                onClick: async () => await router.push("/travel/review"),
              },
            ]
            : [], // 다른 메뉴 항목은 비워둡니다.
    };
  });


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb items={[
              { title: 'Home', href: '/' },
              { title: 'List', href: '/list' },
              { title: 'App', href: '/app' },
            ]} />
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 1000,
              background: colorBgContainer,
            }}
          >
            <LayoutBanner />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
