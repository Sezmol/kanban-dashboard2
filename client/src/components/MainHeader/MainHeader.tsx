import { Avatar, Button, Flex, Progress } from "antd";
import AvatarIcon from "../../icons/AvatarIcon";

import styles from "./MainHeader.module.scss";

const MainHeader = () => {
  return (
    <Flex vertical gap={"1rem"} className={styles.mainHeader}>
      <Flex justify='space-between' align='center'>
        <Flex flex={1} gap={"0.75rem"} align='center'>
          <Avatar size={48} />
          <Flex className={styles.progress} align='center'>
            <Progress strokeColor='#6e6af0' size={[256, 6]} percent={68} />
          </Flex>
        </Flex>
        <Flex gap={"1.25rem"} align='center'>
          <Avatar.Group maxCount={4}>
            {new Array(5).fill(0).map((_, index) => (
              <Avatar key={index} size={32} className={styles.avatar}>
                <AvatarIcon />
              </Avatar>
            ))}
          </Avatar.Group>
          <Button className={styles.addButton} type='primary'>
            + Add board
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MainHeader;
