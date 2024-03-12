import { Empty, Flex } from "antd";
import { useQuery } from "@apollo/client";

import BoardContentSection from "../Section/BoardContentSection";
import {
  IBoardContentList,
  IBoardContentSectionCard,
} from "../../../types/BoardContent";
import { GET_BOARD_CARDS } from "../../../graphql/boardCards/query";

import styles from "./BoardContentHeader.module.scss";

interface IBoardCardsData {
  boardCards: IBoardContentSectionCard[];
}

const boardContentList: IBoardContentList[] = [
  {
    title: "🆕 New",
    sectionCards: [
      {
        title: "AST Builder",
        description:
          "Create an Abstract Syntax Tree using tokens and TreeSitter",
        avatar: "https://avatars.githubusercontent.com/u/1000100?v=4",
        labels: [
          {
            title: "Must",
            bgColor: "#FBE4E1",
            textColor: "#EF887F",
          },
          {
            title: "Medium",
            bgColor: "#EDFAF6",
            textColor: "#60BF9D",
          },
        ],
      },
      {
        title: "Change title",
        description: "Change title website to InnoAST",
        avatar: "https://avatars.githubusercontent.com/u/1000100?v=4",
        labels: [
          {
            title: "Tiny",
            bgColor: "#EDFAF6",
            textColor: "#60BF9D",
          },
        ],
      },
      {
        title: "Change title",
        description: "Change title website to InnoAST",
        avatar: "https://avatars.githubusercontent.com/u/1000100?v=4",
        labels: [
          {
            title: "Tiny",
            bgColor: "#EDFAF6",
            textColor: "#60BF9D",
          },
        ],
      },
      {
        title: "Change title",
        description: "Change title website to InnoAST",
        avatar: "https://avatars.githubusercontent.com/u/1000100?v=4",
        labels: [
          {
            title: "Tiny",
            bgColor: "#EDFAF6",
            textColor: "#60BF9D",
          },
        ],
      },
    ],
  },
  {
    title: "🏗️ In Progress",
    sectionCards: [
      {
        title: "JavaScript lexer",
        description:
          "Research JavaScript grammar and provide an overview on what to expect from a JavaScript lexer",
        avatar: "https://avatars.githubusercontent.com/u/1000100?v=4",
        labels: [
          {
            title: "Must",
            bgColor: "#EDFAF6",
            textColor: "#60BF9D",
          },
        ],
      },
    ],
  },
  {
    title: "👀 Review",
  },
  {
    title: "✅ Done",
  },
];

const BoardContentHeader = () => {
  const { data, error, loading } = useQuery<IBoardCardsData>(GET_BOARD_CARDS);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Flex gap={"1.75rem"} className={styles.boardContent}>
      {data?.boardCards.map((boardContent) => (
        <BoardContentSection key={boardContent.title} {...boardContent} />
      ))}
    </Flex>
  );
};

export default BoardContentHeader;
