import { useState } from "react";
import { Dropdown, Flex, MenuProps } from "antd";
import Title from "antd/es/typography/Title";
import MenuIcon from "../../../icons/MenuIcon";
import Card from "../Card/Card";
import {
  IBoardContentList,
  IBoardContentSectionCard,
} from "../../../types/BoardContent";
import AddTaskButton from "../../AddTaskButton/AddTaskButton";
import AddTaskForm from "../AddTaskForm/AddTaskForm";

import styles from "./BoardContentSection.module.scss";
import { useQuery } from "@apollo/client";
import { GET_BOARD_CARDS } from "../../../graphql/boardCards/query";

interface IBoardContentSectionCardData {
  boardCards: IBoardContentSectionCard[];
}

const items: MenuProps["items"] = [
  {
    label: "Delete Task",
    key: "0",
  },
];

const BoardContentSection = ({ title, emoji }: IBoardContentList) => {
  const [isCardAdding, setIsCardAdding] = useState(false);
  const { data, error, loading } = useQuery<IBoardContentSectionCardData>(
    GET_BOARD_CARDS,
    {
      variables: { parentSection: title },
    }
  );

  return (
    <Flex vertical gap={"1rem"}>
      <Flex align='center' justify='space-between' className={styles.section}>
        <Title className={styles.title} level={5}>
          {emoji} {title}
          <Flex align='center' justify='center' className={styles.taskCount}>
            {data?.boardCards.length}
          </Flex>
        </Title>
        <Dropdown menu={{ items }}>
          <Flex>
            <MenuIcon className={styles.menuIcon} />
          </Flex>
        </Dropdown>
      </Flex>
      <Flex style={{ width: "15.5rem" }} vertical gap={"0.5rem"}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          data?.boardCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              avatars={card.avatars}
              labels={card.labels}
              parentSection={card.parentSection}
            />
          ))
        )}
        {isCardAdding && (
          <AddTaskForm
            parentSection={title}
            handleCancel={() => setIsCardAdding(false)}
          />
        )}
      </Flex>
      {!title.includes("Done") && !isCardAdding && (
        <AddTaskButton
          onClick={() => setIsCardAdding((prev) => !prev)}
        ></AddTaskButton>
      )}
    </Flex>
  );
};

export default BoardContentSection;
