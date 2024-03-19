import { Flex } from "antd";

import { useQuery } from "@apollo/client";
import { LoadingOutlined } from "@ant-design/icons";

import BoardContentColumn from "./Column/BoardContentColumn";
import {
  IBoardContentList,
  IBoardContentSectionCard,
} from "../../types/BoardContent";
import { GET_ALL_BOARD_COLUMNS } from "../../graphql/boardColumns/query";

import styles from "./BoardContent.module.scss";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

// const boardContentList: IBoardContentList[] = [
//   {
//     id: "1",
//     title: "New",
//     emoji: "🆕",
//   },
//   {
//     id: "2",
//     title: "In progress",
//     emoji: "🏗️",
//   },
//   {
//     id: "3",
//     title: "Review",
//     emoji: "👀",
//   },
//   {
//     id: "4",
//     title: "Done",
//     emoji: "✅",
//   },
// ];

interface Data {
  columns: IBoardContentList[];
}

const BoardContent = () => {
  const { data, loading } = useQuery<Data>(GET_ALL_BOARD_COLUMNS);
  const [columns, setColumns] = useState<IBoardContentList[]>();
  const [cards, setCards] = useState<IBoardContentSectionCard[]>();
  const [activeColumn, setActiveColumn] = useState<IBoardContentList | null>(
    null
  );
  const [activeCard, setactiveCard] = useState<IBoardContentSectionCard | null>(
    null
  );

  useEffect(() => {
    if (data) {
      setColumns(data.columns);
      setCards(data.columns.map((column) => column.cards).flat());
    }
  }, [data]);

  console.log(cards);

  if (loading) {
    return (
      <Flex style={{ width: "100%" }} justify='center' align='center'>
        <LoadingOutlined style={{ fontSize: "5rem" }} />
      </Flex>
    );
  }

  const getItemPos = (id: UniqueIdentifier) =>
    columns?.findIndex((item) => item.id === id);

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) {
      return;
    }

    if (over?.id) {
      const isActiveTask = active.data.current?.type === "card";
      const isOverTask = over.data.current?.type === "card";

      if (isActiveTask && isOverTask) {
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) {
      return;
    }

    if (over?.id) {
      setColumns((columns) => {
        const originalPos = getItemPos(active.id);
        const newPos = getItemPos(over?.id);

        if (
          columns &&
          typeof originalPos === "number" &&
          typeof newPos === "number"
        ) {
          return arrayMove(columns, originalPos, newPos);
        } else {
          return columns;
        }
      });
    }
  };

  return (
    <Flex gap={"1.75rem"} className={styles.boardContent}>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <SortableContext items={columns?.map((column) => column.id) || []}>
          {columns?.map((column) => (
            <BoardContentColumn
              id={column.id}
              key={column.title}
              title={column.title}
              emoji={column.emoji}
              cards={column.cards}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Flex>
  );
};

export default BoardContent;

// const handleDragStart = (event: DragStartEvent) => {
//   const { active } = event;
//   const { id } = active;
//   setActiveId(id);
// };

// const handleDragMove = (event: DragMoveEvent) => {
//   const { active, over } = event;

//   if (
//     active.id.toString().includes("card") &&
//     over?.id.toString().includes("card") &&
//     active &&
//     over &&
//     over.id !== active.id
//   ) {
//     const activeColumn = findValueOfItems(active.id, "container");
//     const overColumn = findValueOfItems(over.id, "container");

//     if (!activeColumn && !overColumn) {
//       return;
//     }
//     const activeColumnIndex = columns?.findIndex(
//       (column) => column.id === activeColumn?.id
//     );
//     const overColumnIndex = columns?.findIndex(
//       (column) => column.id === overColumn?.id
//     );

//     const activeCardIndex = activeColumn?.cards.findIndex(
//       (card) => card.id === active.id
//     );
//     const overCardIndex = overColumn?.cards.findIndex(
//       (card) => card.id === over.id
//     );

//     if (
//       boardContentList &&
//       activeCardIndex &&
//       activeColumnIndex &&
//       overColumnIndex &&
//       overCardIndex
//     ) {
//       if (activeColumnIndex === overColumnIndex) {
//         let newCards = [...boardContentList];
//         newCards[activeCardIndex].cards = arrayMove(
//           newCards[activeColumnIndex].cards,
//           activeColumnIndex,
//           overColumnIndex
//         );
//         setColumns(newCards);
//       } else {
//         let newCards = [...boardContentList];
//         const [removedCard] = newCards[activeColumnIndex].cards.splice(
//           activeCardIndex,
//           1
//         );
//         newCards[overColumnIndex].cards.splice(overCardIndex, 0, removedCard);
//         setColumns(newCards);
//       }
//     }
//   }
// };
// const handleDragEnd = (event: DragEndEvent) => {
//   const { active, over } = event;

//   if (
//     active.id.toString().includes("column") &&
//     over?.id.toString().includes("column") &&
//     active &&
//     over &&
//     active.id !== over.id
//   ) {
//     const activeContainerIndex =
//       columns?.findIndex((container) => container.id === active.id) || 0;
//     const overContainerIndex =
//       columns?.findIndex((container) => container.id === over.id) || 0;
//     let newItems = [...(columns || [])];
//     newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
//     setColumns(newItems);
//   }

//   if (
//     active.id.toString().includes("card") &&
//     over?.id.toString().includes("card") &&
//     active &&
//     over &&
//     active.id !== over.id
//   ) {
//     const activeContainer = findValueOfItems(active.id, "card");
//     const overContainer = findValueOfItems(over.id, "card");

//     if (!activeContainer || !overContainer) return;
//     const activeContainerIndex =
//       columns?.findIndex(
//         (container) => container.id === activeContainer.id
//       ) || 0;
//     const overContainerIndex =
//       columns?.findIndex((container) => container.id === overContainer.id) ||
//       0;
//     const activeitemIndex =
//       activeContainer.cards.findIndex((item) => item.id === active.id) || 0;
//     const overitemIndex =
//       overContainer.cards.findIndex((item) => item.id === over.id) || 0;

//     if (activeContainerIndex === overContainerIndex) {
//       let newItems = [...(columns || [])];
//       newItems[activeContainerIndex].cards = arrayMove(
//         newItems[activeContainerIndex].cards,
//         activeitemIndex,
//         overitemIndex
//       );
//       setColumns(newItems);
//     } else {
//       let newItems = [...(columns || [])];
//       const [removeditem] = newItems[activeContainerIndex].cards.splice(
//         activeitemIndex,
//         1
//       );
//       newItems[overContainerIndex].cards.splice(
//         overitemIndex,
//         0,
//         removeditem
//       );
//       setColumns(newItems);
//     }
//   }
//   if (
//     active.id.toString().includes("card") &&
//     over?.id.toString().includes("column") &&
//     active &&
//     over &&
//     active.id !== over.id
//   ) {
//     const activeContainer = findValueOfItems(active.id, "card");
//     const overContainer = findValueOfItems(over.id, "column");

//     if (!activeContainer || !overContainer) return;
//     const activeContainerIndex =
//       columns?.findIndex(
//         (container) => container.id === activeContainer.id
//       ) || 0;
//     const overContainerIndex =
//       columns?.findIndex((container) => container.id === overContainer.id) ||
//       0;
//     const activeitemIndex =
//       activeContainer.cards.findIndex((item) => item.id === active.id) || 0;

//     let newItems = [...(columns || [])];
//     const [removeditem] = newItems[activeContainerIndex].cards.splice(
//       activeitemIndex,
//       1
//     );
//     newItems[overContainerIndex].cards.push(removeditem);
//     setColumns(newItems);
//   }
//   setActiveId(null);
// };
