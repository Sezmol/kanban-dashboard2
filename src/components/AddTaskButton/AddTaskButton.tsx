import { Button } from "antd";
import PlusIcon from "../../icons/PlusIcon";

import styles from "./AddTaskButton.module.scss";

type AddTaskButtonProps = {
  onClick: () => void;
};

const AddTaskButton = ({ onClick }: AddTaskButtonProps) => {
  return (
    <Button onClick={onClick} className={styles.button}>
      <PlusIcon />
      Add Task
    </Button>
  );
};

export default AddTaskButton;
