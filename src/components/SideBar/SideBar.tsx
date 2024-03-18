import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import { Avatar, Menu, Typography } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

import Analytics from "../Analytics/Analytics";

import styles from "./SideBar.module.scss";

const projectsList: MenuItemType[] = [
  {
    key: "1",
    title: "Building enterprise",
    icon: "../../assets/emoji/city.png",
  },
  {
    key: "2",
    title: "Web platform",
    icon: "🌐",
  },
  {
    key: "3",
    title: "Mac website",
    icon: "🍔",
  },
  {
    key: "4",
    title: "Cosmetic web app",
    icon: "🚀",
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
            <Avatar className={styles.avatar} src={project.icon} />
            <Typography.Text>{project.title}</Typography.Text>
          </Menu.Item>
        ))}
      </Menu>
      <Analytics />
    </Sider>
  );
};

export default SideBar;
