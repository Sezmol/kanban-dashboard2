import { Avatar, Flex, Input, Layout, Typography } from "antd";

import SearchIcon from "../../icons/SearchIcon";
import EmailIcon from "../../icons/EmailIcon";
import BellIcon from "../../icons/BellIcon";
import AvatarIcon from "../../icons/AvatarIcon";

import styles from "./Header.module.scss";
const { Header: HeaderLayout } = Layout;

const { Text, Title } = Typography;

const Header = () => {
  return (
    <HeaderLayout className={styles.header}>
      <Input
        className={styles.search}
        placeholder='Search'
        prefix={<SearchIcon />}
      />
      <Flex gap={"1rem"} align='center'>
        <EmailIcon />
        <BellIcon />
        <Flex gap={"0.5rem"} justify='center' align='center'>
          <Avatar className={styles.avatar} icon={<AvatarIcon />} />
          <Flex vertical>
            <Title className={styles.name} level={5}>
              Alexandra C.
            </Title>
            <Text type='secondary'>Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </HeaderLayout>
  );
};

export default Header;
