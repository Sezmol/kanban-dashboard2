import { useEffect, useState } from "react";
import { Flex } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { LoadingOutlined } from "@ant-design/icons";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import BoardContentColumn from "./Column/BoardContentColumn";
import {
  IBoardContentColumn,
  IBoardContentColumnCard,
} from "../../types/BoardContent";
import { GET_ALL_BOARD_CARDS } from "../../graphql/boardCards/query";
import BoardContentCard from "./Card/BoardContentCard";
import {
  PUBLISH_BOARD_CARD,
  UPDATE_BOARD_CARD,
} from "../../graphql/boardCards/mutation";

import styles from "./BoardContent.module.scss";

const boardContentList = [
  {
    id: "clty4h7gug9lj07vznvxamyxw",
    title: "New",
    emoji: "🆕",
  },
  {
    id: "clty4o24jghfn07vznbsmo4r6",
    title: "In progress",
    emoji: "🏗️",
  },
  {
    id: "clty4oowqghxe07vzogqow2fj",
    title: "Review",
    emoji: "👀",
  },
  {
    id: "clty4p2mrggor07w0n81brry7",
    title: "Done",
    emoji: "✅",
  },
];

interface ICardsData {
  cards: IBoardContentColumnCard[];
}

const BoardContent = () => {
  const { data: cardsData, loading } =
    useQuery<ICardsData>(GET_ALL_BOARD_CARDS);
  const [updateCard] = useMutation(UPDATE_BOARD_CARD);
  const [publishCard] = useMutation(PUBLISH_BOARD_CARD);
  const [columns, setColumns] = useState(boardContentList);
  const [cards, setCards] = useState<IBoardContentColumnCard[]>();
  const [activeColumn, setActiveColumn] = useState<IBoardContentColumn | null>(
    null
  );
  const [activeCard, setActiveCard] = useState<IBoardContentColumnCard | null>(
    null
  );

  useEffect(() => {
    if (cardsData) {
      setCards(cardsData.cards);
    }
  }, [cardsData]);

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column);
    }

    if (event.active.data.current?.type === "card") {
      setActiveCard(event.active.data.current.card);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveACard = active.data.current?.type === "card";
    const isOverACard = over.data.current?.type === "card";

    if (!isActiveACard) return;

    if (isActiveACard && isOverACard) {
      setCards((cards) => {
        if (cards) {
          const newCards = [...cards];
          const activeIndex = cards.findIndex((t) => t.id === activeId);
          const overIndex = cards.findIndex((t) => t.id === overId);

          if (cards[activeIndex].columnId !== cards[overIndex].columnId) {
            // console.log("DROPPING TASK OVER CARD", { active, over });
            const updatedCard = {
              ...cards[activeIndex],
              columnId: cards[overIndex].columnId,
            };

            newCards[activeIndex] = updatedCard;
            return arrayMove(newCards, activeIndex, overIndex - 1);
          }

          return arrayMove(newCards, activeIndex, overIndex);
        }
      });
    }

    const isOverAColumn = over.data.current?.type === "column";

    if (isActiveACard && isOverAColumn) {
      setCards((cards) => {
        if (cards) {
          const newCards = [...cards];
          const activeIndex = newCards.findIndex((t) => t.id === activeId);

          const updatedCard = { ...newCards[activeIndex], columnId: overId };

          newCards[activeIndex] = updatedCard;

          // console.log("DROPPING TASK OVER COLUMN", { activeIndex });

          return newCards;
        }
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveColumn(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (active.data.current?.type === "card") {
      try {
        const columnId = over.data.current?.card.columnId;
        const result = await updateCard({
          variables: {
            columnId: columnId,
            id: activeCard?.id,
          },
        });
        const id = result.data?.updateCard?.id;

        if (id) {
          await publishCard({ variables: { id } });
        }

        setActiveCard(null);
      } catch (error) {
        console.error(error);
      }
    }

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "column";

    if (!isActiveAColumn) return;

    setColumns((columns) => {
      // console.log(active, over);
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      if (over.data.current?.type === "card") {
        if (cards) {
          const overCardIndex = cards.findIndex((card) => card.id === overId);
          const parentColumnId = cards[overCardIndex].columnId;
          const overColumnIndex = columns.findIndex(
            (col) => col.id === parentColumnId
          );
          return arrayMove(columns, activeColumnIndex, overColumnIndex);
        }
      }

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

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
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
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
