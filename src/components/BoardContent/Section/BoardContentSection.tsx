import { Button, Dropdown, Flex, MenuProps } from "antd";
import Title from "antd/es/typography/Title";
import MenuIcon from "../../../icons/MenuIcon";
import Card from "../Card/Card";
import { IBoardContentSectionCard } from "../../../types/BoardContent";

import styles from "./BoardContentSection.module.scss";
import AddTaskButton from "../../AddTaskButton/AddTaskButton";

type BoardContentSectionProps = {
  title: string;
  sectionCards?: IBoardContentSectionCard[];
};

const items: MenuProps["items"] = [
  {
    label: "Delete Task",
    key: "0",
  },
];

const BoardContentSection = ({
  title,
  sectionCards = [],
}: BoardContentSectionProps) => {
  return (
    <Flex vertical gap={"1rem"}>
      <Flex align='center' justify='space-between' className={styles.section}>
        <Title className={styles.title} level={5}>
          {title}
          <Flex align='center' justify='center' className={styles.taskCount}>
            {sectionCards.length}
          </Flex>
        </Title>
        <Dropdown menu={{ items }}>
          <MenuIcon className={styles.menuIcon} />
        </Dropdown>
      </Flex>
      <Flex vertical gap={"0.5rem"}>
        {sectionCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            avatar={card.avatar}
            labels={card.labels}
          />
        ))}
      </Flex>
      {!title.includes("Done") && <AddTaskButton></AddTaskButton>}
    </Flex>
  );
};

export default BoardContentSection;
