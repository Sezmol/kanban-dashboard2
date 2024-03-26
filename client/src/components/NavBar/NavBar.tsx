import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Flex, Menu, MenuProps } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

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

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  className?: string,
  children?: MenuItemType[],
  type?: "group"
): MenuItemType {
  return {
    key,
    icon,
    children,
    label,
    className,
    type,
  } as MenuItemType;
}

const NavBar = () => {
  const [selectedKey, setSelectedKey] = useState("2");

  const menuItems: MenuProps["items"] = [
    getItem(
      null,
      "1",
      selectedKey === "1" ? <AppstoreFilledIcon /> : <AppstoreIcon />,
      styles.menu_item
    ),
    getItem(
      null,
      "2",
      selectedKey === "2" ? <ProjectsFilledIcon /> : <ProjectsIcon />,
      styles.menu_item
    ),
    getItem(
      null,
      "3",
      selectedKey === "3" ? <DocumentsFilledIcon /> : <DocumentsIcon />,
      styles.menu_item
    ),
    getItem(
      null,
      "4",
      selectedKey === "4" ? <ShopingBasketFilledIcon /> : <ShopingBasketIcon />,
      styles.menu_item
    ),
    getItem(
      null,
      "5",
      selectedKey === "5" ? <ChatFilledIcon /> : <ChatIcon />,
      styles.menu_item
    ),
    getItem(
      null,
      "6",
      selectedKey === "6" ? <MoonFilledIcon /> : <MoonIcon />,
      styles.menu_item
    ),
    getItem(null, "7", <TrashIcon />, styles.menu_item),
  ];

  return (
    <Sider width='4rem' theme='light' className={styles.navbar}>
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
          items={menuItems}
        />
      </Flex>
    </Sider>
  );
};

export default NavBar;
