import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import { Menu, MenuProps } from "antd";
import Analytics from "../Analytics/Analytics";
import SideBarItem from "./SideBarItem/SideBarItem";

import styles from "./SideBar.module.scss";

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
