import { useState } from "react";
import { Badge, Dropdown, Flex, MenuProps } from "antd";
import Title from "antd/es/typography/Title";

import MenuIcon from "../../../icons/MenuIcon";
import BoardContentCard from "../Card/BoardContentCard";
import { IBoardContentList } from "../../../types/BoardContent";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import styles from "./BoardContentColumn.module.scss";

const BoardContentColumn = ({ id, title, emoji, cards }: IBoardContentList) => {
  const [isCardAdding, setIsCardAdding] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      data: {
        type: "column",
        column: {
          id,
          title,
          emoji,
          cards,
        },
      },
    });

  return (
    <Flex
      style={{ transition, transform: CSS.Translate.toString(transform) }}
      ref={setNodeRef}
      {...attributes}
      vertical
      gap={"1rem"}
    >
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
            count={cards.length}
          />
        </Title>

        <Flex {...listeners} style={{ cursor: "grab" }}>
          <MenuIcon className={styles.menuIcon} />
        </Flex>
      </Flex>
      <Flex style={{ width: "15.5rem" }} vertical gap={"0.5rem"}>
        <SortableContext items={cards} strategy={rectSortingStrategy}>
          {cards.map((card) => (
            <BoardContentCard
              id={card.id}
              key={card.id}
              title={card.title}
              description={card.description}
              avatars={card.avatars}
              labels={card.labels}
              parentSection={card.parentSection}
            />
          ))}
        </SortableContext>

        {isCardAdding && (
          <AddTaskForm
            parentSection={title}
            handleCancel={() => setIsCardAdding(false)}
          />
        )}
      </Flex>
      {!title.includes("Done") && !isCardAdding && (
        <AddTaskButton onClick={() => setIsCardAdding((prev) => !prev)} />
      )}
    </Flex>
  );
};

export default BoardContentColumn;
