import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import { Avatar, Menu, MenuProps, Typography } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

import Analytics from "../Analytics/Analytics";

import styles from "./SideBar.module.scss";
import SideBarItem from "./SideBarItem/SideBarItem";

const menuItems: MenuProps["items"] = [
  {
    key: "1",
    label: <SideBarItem title='Building enterprise' icon='🏙️' />,
    className: styles.projectItem,
  },
  {
    key: "2",
    label: <SideBarItem title='Web platform' icon='🌐' />,
    className: styles.projectItem,
  },
  {
    key: "3",
    label: <SideBarItem title='Mac website' icon='🍔' />,
    className: styles.projectItem,
  },
  {
    key: "4",
    label: <SideBarItem title='Cosmetic web app' icon='🚀' />,
    className: styles.projectItem,
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
        items={menuItems}
      />

      <Analytics />
    </Sider>
  );
};

export default SideBar;

// {projectsList.map((project) => (
//   <Menu.Item className={styles.projectItem} key={project.key}>
//     <Avatar className={styles.avatar} src={project.icon} />
//     <Typography.Text>{project.title}</Typography.Text>
//   </Menu.Item>
// ))}
