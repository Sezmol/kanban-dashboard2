import { Flex } from "antd";
import { Content } from "antd/es/layout/layout";
import Icons from "../MainHeader/Icons/Icons";
import Tabs from "../MainHeader/Tabs/Tabs";

import styles from "./MainContent.module.scss";

const MainContent = () => {
  return (
    <Content className={styles.mainContent}>
      <Tabs />
      <Icons />
    </Content>
  );
};

export default MainContent;
