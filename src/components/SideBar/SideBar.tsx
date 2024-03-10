import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";

import styles from "./SideBar.module.scss";
import { Avatar, Flex, Menu, Typography } from "antd";

const projectsList = [
  {
    key: "1",
    title: "Building enterprise",
    emoji: "🏙️",
    backgroundColor: "#DBEEFF",
  },
  {
    key: "2",
    title: "Web platform",
    emoji: "🌐",
    backgroundColor: "#EDF6FA",
  },
  {
    key: "3",
    title: "Mac website",
    emoji: "🍔",
    backgroundColor: "#FCE1C6",
  },
  {
    key: "4",
    title: "Cosmetic web app",
    emoji: "🚀",
    backgroundColor: "#F4D7F1 ",
  },
];

const SideBar = () => {
  return (
    <Sider className={styles.sidebar} theme='light'>
      <Title level={4}>Projects</Title>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode='inline'
        className={styles.menu}
      >
        {projectsList.map((project) => (
          <Menu.Item className={styles.projectItem} key={project.key}>
            <Avatar
              style={{ backgroundColor: project.backgroundColor }}
              icon={project.emoji}
            />
            <Typography.Text>{project.title}</Typography.Text>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
