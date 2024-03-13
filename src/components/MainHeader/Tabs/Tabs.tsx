import { Tabs as AntdTabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import BoardContentHeader from "../../BoardContent/Header/BoardContentHeader";

import styles from "./Tabs.module.scss";
import TableContent from "../../TableContent/TableContent";

const tabList = [
  {
    key: "1",
    title: "Description",
    content: "Description content",
  },
  {
    key: "2",
    title: "Board",
    content: <BoardContentHeader />,
  },
  {
    key: "3",
    title: "Notes",
    content: "Notes content",
  },
  {
    key: "4",
    title: "Table",
    content: <TableContent />,
  },
];

const Tabs = () => {
  return (
    <AntdTabs tabBarGutter={38} className={styles.tabs}>
      {tabList.map((tab) => (
        <TabPane className={styles.tabItem} tab={tab.title} key={tab.key}>
          {tab.content}
        </TabPane>
      ))}
    </AntdTabs>
  );
};

export default Tabs;
