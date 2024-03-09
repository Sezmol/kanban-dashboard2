import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Flex, Menu } from "antd";

// Icons
import Logo from "../../icons/Logo";
import AppstoreIcon from "../../icons/Appstore/AppstoreIcon";
import ProjectsIcon from "../../icons/Projects/ProjectsIcon";
import DocumentsIcon from "../../icons/Documents/DocumentsIcon";
import ShopingBasketIcon from "../../icons/ShopingBasket/ShopingBasketIcon";
import ChatIcon from "../../icons/Chat/ChatIcon";
import MoonIcon from "../../icons/Moon/MoonIcon";
import TrashIcon from "../../icons/TrashIcon";
import AppstoreFilledIcon from "../../icons/Appstore/AppstoreFilledIcon";
import ProjectsFilledIcon from "../../icons/Projects/ProjectsFilledIcon";
import DocumentsFilledIcon from "../../icons/Documents/DocumentsFilledIcon";
import ShopingBasketFilledIcon from "../../icons/ShopingBasket/ShopingBasketFilledIcon";
import ChatFilledIcon from "../../icons/Chat/ChatFilledIcon";
import MoonFilledIcon from "../../icons/Moon/MoonFilledIcon";

import styles from "./NavBar.module.scss";

const menuItems = [
  {
    key: "1",
    icon: <AppstoreIcon />,
    filledIcon: <AppstoreFilledIcon />,
    title: "Appstore",
  },
  {
    key: "2",
    icon: <ProjectsIcon />,
    filledIcon: <ProjectsFilledIcon />,
    title: "Projects",
  },
  {
    key: "3",
    icon: <DocumentsIcon />,
    filledIcon: <DocumentsFilledIcon />,
    title: "Documents",
  },
  {
    key: "4",
    icon: <ShopingBasketIcon />,
    filledIcon: <ShopingBasketFilledIcon />,
    title: "Shoping Basket",
  },
  {
    key: "5",
    icon: <ChatIcon />,
    filledIcon: <ChatFilledIcon />,
    title: "Chat",
  },
  {
    key: "6",
    icon: <MoonIcon />,
    filledIcon: <MoonFilledIcon />,
    title: "Moon",
  },
  {
    key: "7",
    icon: <TrashIcon />,
    title: "Trash",
  },
];

const NavBar = () => {
  const [selectedKey, setSelectedKey] = useState("2");

  return (
    <Sider width='4rem' theme='light' className={styles.sider}>
      <Flex
        className={styles.sider_container}
        gap='3rem'
        vertical
        justify='center'
        align='center'
      >
        <Logo />
        <Menu
          className={styles.menu}
          defaultSelectedKeys={[selectedKey]}
          mode='vertical'
          onSelect={({ key }) => setSelectedKey(key)}
        >
          {menuItems.map((item) => (
            <Menu.Item
              className={styles.menu_item}
              key={item.key}
              icon={selectedKey === item.key ? item.filledIcon : item.icon}
            />
          ))}
        </Menu>
      </Flex>
    </Sider>
  );
};

export default NavBar;
