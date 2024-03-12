import { Button } from "antd";
import PlusIcon from "../../icons/PlusIcon";

import styles from "./AddTaskButton.module.scss";

const AddTaskButton = () => {
  return (
    <Button className={styles.button}>
      <PlusIcon />
      Add Task
    </Button>
  );
};

export default AddTaskButton;
