import { Flex } from "antd";
import ReloadIcon from "../../../icons/ReloadIcon";
import MoveIcon from "../../../icons/MoveIcon";
import FilterIcon from "../../../icons/FilterIcon";

import styles from "./Icons.module.scss";

const Icons = () => {
  return (
    <Flex className={styles.icons} gap={"1rem"}>
      <ReloadIcon />
      <MoveIcon />
      <FilterIcon />
    </Flex>
  );
};

export default Icons;
