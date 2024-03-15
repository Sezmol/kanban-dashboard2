import { Avatar, Flex, Card, Dropdown, MenuProps, Button } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import MenuIcon from "../../../icons/MenuIcon";
import { IBoardContentSectionCard } from "../../../types/BoardContent";
import { getLabelColor } from "../../../utils/helpers";
import { Reference, useMutation } from "@apollo/client";
import { DELETE_BOARD_CARD } from "../../../graphql/boardCards/mutation";

import styles from "./BoardContentCard.module.scss";

const BoardContentCard = ({
  id,
  title,
  description,
  avatars,
  labels,
}: IBoardContentSectionCard) => {
  const [deleteTask, { data, loading, error }] = useMutation(
    DELETE_BOARD_CARD,
    {
      update: (cache, { data: { deleteBoardCard } }) => {
        cache.modify({
          fields: {
            boardCards(boardCardsRefs = []) {
              return boardCardsRefs.filter(
                (boardCardRef: Reference) =>
                  boardCardRef.__ref !== `BoardCard:${deleteBoardCard.id}`
              );
            },
          },
        });
      },
    }
  );

  const items: MenuProps["items"] = [
    {
      label: (
        <Button
          type='text'
          loading={loading}
          onClick={() => deleteTask({ variables: { id } })}
        >
          {loading ? "Loading..." : "Delete Task"}
        </Button>
      ),
      key: "0",
    },
  ];

  return (
    <Card className={styles.card}>
      <Flex justify='space-between' align='center'>
        <Flex gap={"0.5rem"} align='center'>
          <Flex>
            <Avatar.Group size={20} maxCount={3}>
              {avatars?.map((avatar, index) => (
                <Avatar
                  style={{ display: "flex", width: 20, height: 20 }}
                  src={avatar}
                  key={index}
                />
              ))}
            </Avatar.Group>
          </Flex>
          <Title
            ellipsis
            style={{
              maxWidth: "11.75rem",
              fontSize: 14,
              margin: 0,
              fontWeight: 500,
            }}
            level={5}
          >
            {title}
          </Title>
        </Flex>
        <Dropdown menu={{ items }}>
          <Flex style={{ cursor: "pointer" }}>
            <MenuIcon className={styles.menuIcon} />
          </Flex>
        </Dropdown>
      </Flex>
      <Paragraph ellipsis={{ rows: 2 }} className={styles.desc}>
        {description}
      </Paragraph>
      <Flex style={{ marginTop: "auto" }} gap={7}>
        {labels.map((label, index) => (
          <Flex
            align='center'
            justify='center'
            style={getLabelColor(label)}
            className={styles.label}
            key={index}
          >
            {label[0].toUpperCase() + label.slice(1)}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};

export default BoardContentCard;
