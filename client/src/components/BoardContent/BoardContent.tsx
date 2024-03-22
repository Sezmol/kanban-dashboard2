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
  ICardsData,
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
      setActiveCard(null);
    }

    if (event.active.data.current?.type === "card") {
      setActiveColumn(null);
      setActiveCard(event.active.data.current.card);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || over.id === active.id) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "column") {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
          (col) => col.id === active.id
        );
        let targetIndex;

        if (overType === "card" && cards) {
          const parentColumnId = cards.find(
            (card) => card.id === over.id
          )?.columnId;
          targetIndex = columns.findIndex((col) => col.id === parentColumnId);
        } else {
          targetIndex = columns.findIndex((col) => col.id === over.id);
        }

        return arrayMove(columns, activeColumnIndex, targetIndex);
      });
    }

    if (activeType === "card") {
      setCards((cards) => {
        if (!cards) return;

        const activeIndex = cards.findIndex((card) => card.id === active.id);

        if (overType === "column") {
          const newCards = [...cards];
          newCards[activeIndex] = {
            ...cards[activeIndex],
            columnId: over.id,
          };
          return newCards;
        } else if (overType === "card") {
          const overIndex = cards.findIndex((card) => card.id === over.id);

          if (cards[activeIndex].columnId !== cards[overIndex].columnId) {
            const newCards = [...cards];

            newCards[activeIndex] = {
              ...newCards[activeIndex],
              columnId: newCards[overIndex].columnId,
            };

            return newCards;
          }
          return arrayMove(cards, activeIndex, overIndex);
        }
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active } = event;
    if (!active) return;

    if (active.data.current?.type === "card") {
      try {
        const columnId = active.data.current?.card?.columnId;
        const restul = await updateCard({
          variables: {
            columnId: columnId,
            id: active.id,
          },
        });
        const resultId = restul.data?.updateCard?.id;
        console.log("RESULT", resultId);

        if (resultId) {
          await publishCard({ variables: { id: resultId } });
        }
      } catch (error) {
        console.error(error);
      }
    }
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
