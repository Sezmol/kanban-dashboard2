import { useState } from "react";
import { Badge, Dropdown, Flex, MenuProps } from "antd";
import Title from "antd/es/typography/Title";
import { useQuery } from "@apollo/client";

import MenuIcon from "../../../icons/MenuIcon";
import BoardContentCard from "../Card/BoardContentCard";
import {
  IBoardContentList,
  IBoardContentSectionCard,
} from "../../../types/BoardContent";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import { GET_BOARD_CARDS } from "../../../graphql/boardCards/query";

import styles from "./BoardContentColumn.module.scss";

interface IBoardContentSectionCardData {
  boardCards: IBoardContentSectionCard[];
}

const BoardContentColumn = ({ title, emoji }: IBoardContentList) => {
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
          <Badge
            color='white'
            style={{
              color: "black",
              fontSize: 10,
              fontWeight: 500,
              width: "2rem",
            }}
            count={data?.boardCards.length}
          />
        </Title>

        <MenuIcon className={styles.menuIcon} />
      </Flex>
      <Flex style={{ width: "15.5rem" }} vertical gap={"0.5rem"}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          data?.boardCards.map((card) => (
            <BoardContentCard
              id={card.id}
              key={card.id}
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

export default BoardContentColumn;
