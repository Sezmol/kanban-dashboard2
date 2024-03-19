import { Tabs as AntdTabs, TabsProps } from "antd";

import TableContent from "../../TableContent/TableContent";
import BoardContent from "../../BoardContent/BoardContent";

import styles from "./Tabs.module.scss";

const tabList: TabsProps["items"] = [
  {
    key: "1",
    label: "Description",
    children: "Description content",
    className: styles.tabItem,
  },
  {
    key: "2",
    label: "Board",
    children: <BoardContent />,
    className: styles.tabItem,
  },
  {
    key: "3",
    label: "Notes",
    children: "Notes content",
    className: styles.tabItem,
  },
  {
    key: "4",
    label: "Table",
    children: <TableContent />,
    className: styles.tabItem,
  },
];

const Tabs = () => {
  return <AntdTabs items={tabList} tabBarGutter={38} className={styles.tabs} />;
};

export default Tabs;
