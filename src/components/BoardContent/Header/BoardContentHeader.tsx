import { Flex } from "antd";

import BoardContentColumn from "../Column/BoardContentColumn";
import { IBoardContentList } from "../../../types/BoardContent";

import styles from "./BoardContentHeader.module.scss";

const boardContentList: IBoardContentList[] = [
  {
    title: "New",
    emoji: "🆕",
    // sectionCards: [
    //   {
    //     title: "AST Builder",
    //     description:
    //       "Create an Abstract Syntax Tree using tokens and TreeSitter",
    //     avatars: ["https://avatars.githubusercontent.com/u/1000100?v=4"],
    //     labels: [
    //       {
    //         title: "Must",
    //         bgColor: "#FBE4E1",
    //         textColor: "#EF887F",
    //       },
    //       {
    //         title: "Medium",
    //         bgColor: "#EDFAF6",
    //         textColor: "#60BF9D",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Change title",
    //     description: "Change title website to InnoAST",
    //     avatars: ["https://avatars.githubusercontent.com/u/1000100?v=4"],
    //     labels: [
    //       {
    //         title: "Tiny",
    //         bgColor: "#EDFAF6",
    //         textColor: "#60BF9D",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Change title",
    //     description: "Change title website to InnoAST",
    //     avatars: ["https://avatars.githubusercontent.com/u/1000100?v=4"],
    //     labels: [
    //       {
    //         title: "Tiny",
    //         bgColor: "#EDFAF6",
    //         textColor: "#60BF9D",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Change title",
    //     description: "Change title website to InnoAST",
    //     avatars: ["https://avatars.githubusercontent.com/u/1000100?v=4"],
    //     labels: [
    //       {
    //         title: "Tiny",
    //         bgColor: "#EDFAF6",
    //         textColor: "#60BF9D",
    //       },
    //     ],
    //   },
    // ],
  },
  {
    title: "In progress",
    emoji: "🏗️",
    // sectionCards: [
    //   {
    //     title: "JavaScript lexer",
    //     description:
    //       "Research JavaScript grammar and provide an overview on what to expect from a JavaScript lexer",
    //     avatars: ["https://avatars.githubusercontent.com/u/1000100?v=4"],
    //     labels: [
    //       {
    //         title: "Huge",
    //         bgColor: "#EDFAF6",
    //         textColor: "#60BF9D",
    //       },
    //     ],
    //   },
    // ],
  },
  {
    title: "Review",
    emoji: "👀",
  },
  {
    title: "Done",
    emoji: "✅",
  },
];

const BoardContentHeader = () => {
  return (
    <Flex gap={"1.75rem"} className={styles.boardContent}>
      {boardContentList.map((boardContent) => (
        <BoardContentColumn
          key={boardContent.title}
          title={boardContent.title}
          emoji={boardContent.emoji}
        />
      ))}
    </Flex>
  );
};

export default BoardContentHeader;
