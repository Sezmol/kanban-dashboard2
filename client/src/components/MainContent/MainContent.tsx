import { Content } from "antd/es/layout/layout";
import Tabs from "./Tabs/Tabs";
import Icons from "./Icons/Icons";

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
