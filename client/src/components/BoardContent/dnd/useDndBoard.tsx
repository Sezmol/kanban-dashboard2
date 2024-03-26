import { useEffect, useState } from "react";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  IBoardContentColumn,
  IBoardContentColumnCard,
} from "../../../types/BoardContent";
import useCards from "../../../hooks/useCards";

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

const useDndBoard = () => {
  const { cardsData, loading, updateCard, publishCard } = useCards();
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
    if (!event.over) {
      return;
    }
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

  return {
    columns,
    cards,
    activeColumn,
    activeCard,
    loading,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

export default useDndBoard;
