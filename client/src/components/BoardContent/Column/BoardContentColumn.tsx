import { useState } from "react";
import { Badge, Flex } from "antd";
import Title from "antd/es/typography/Title";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import MenuIcon from "../../../icons/MenuIcon";
import BoardContentCard from "../Card/BoardContentCard";
import { IBoardContentColumn } from "../../../types/BoardContent";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import AddTaskForm from "../AddTaskForm/AddTaskForm";

import styles from "./BoardContentColumn.module.scss";

const BoardContentColumn = ({
  id,
  title,
  emoji,
  cards,
}: IBoardContentColumn) => {
  const [isCardAdding, setIsCardAdding] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
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

  const style = {
    opacity: isDragging ? 0.5 : 1,
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Flex style={style} ref={setNodeRef} {...attributes} vertical gap={"1rem"}>
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
          <MenuIcon />
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
              columnId={card.columnId}
            />
          ))}
        </SortableContext>

        {isCardAdding && (
          <AddTaskForm
            columnId={id}
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
