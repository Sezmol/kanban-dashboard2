import { Flex } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import BoardContentColumn from "./Column/BoardContentColumn";
import BoardContentCard from "./Card/BoardContentCard";
import useDndBoard from "./dnd/useDndBoard";

import styles from "./BoardContent.module.scss";

const BoardContent = () => {
  const {
    activeCard,
    activeColumn,
    cards,
    columns,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    loading,
  } = useDndBoard();

  if (loading) {
    return (
      <Flex
        style={{ width: "100%", height: "100%" }}
        justify='center'
        align='center'
      >
        <LoadingOutlined style={{ fontSize: "5rem" }} />
      </Flex>
    );
  }

  return (
    <Flex gap={"1.75rem"} className={styles.boardContent}>
      <DndContext
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={columns?.map((column) => column.id) || []}>
          {columns?.map((column) => (
            <BoardContentColumn
              id={column.id}
              key={column.title}
              title={column.title}
              emoji={column.emoji}
              cards={cards?.filter((card) => card.columnId === column.id) || []}
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeColumn && (
            <BoardContentColumn
              id={activeColumn.id}
              key={activeColumn.title}
              title={activeColumn.title}
              emoji={activeColumn.emoji}
              cards={
                cards?.filter((card) => card.columnId === activeColumn.id) || []
              }
            />
          )}
          {activeCard && (
            <BoardContentCard
              id={activeCard.id}
              key={activeCard.id}
              title={activeCard.title}
              description={activeCard.description}
              avatars={activeCard.avatars}
              labels={activeCard.labels}
              columnId={activeCard.columnId}
            />
          )}
        </DragOverlay>
      </DndContext>
    </Flex>
  );
};

export default BoardContent;
