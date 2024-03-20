import { Avatar, Flex, Card, MenuProps, Button, Dropdown, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { CSS } from "@dnd-kit/utilities";
import { useMutation } from "@apollo/client";
import { useSortable } from "@dnd-kit/sortable";
import MenuIcon from "../../../icons/MenuIcon";
import { IBoardContentColumnCard } from "../../../types/BoardContent";
import { DELETE_BOARD_CARD } from "../../../graphql/boardCards/mutation";
import { GET_ALL_BOARD_CARDS } from "../../../graphql/boardCards/query";
import Label from "./Label/Label";

import styles from "./BoardContentCard.module.scss";

const BoardContentCard = ({
  id,
  title,
  description,
  avatars,
  labels,
  columnId,
}: IBoardContentColumnCard) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: id,
    data: {
      type: "card",
      card: {
        id,
        title,
        description,
        avatars,
        labels,
        columnId,
      },
    },
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const [deleteTask, { loading }] = useMutation(DELETE_BOARD_CARD, {
    refetchQueries: [{ query: GET_ALL_BOARD_CARDS }],
  });

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
    <Dropdown menu={{ items }} trigger={["contextMenu"]}>
      <Card
        style={style}
        ref={setNodeRef}
        {...attributes}
        className={styles.card}
      >
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
            <Tooltip mouseEnterDelay={0.5} title={title}>
              <Title
                ellipsis
                style={{
                  maxWidth: "11rem",
                  fontSize: 14,
                  margin: 0,
                  fontWeight: 500,
                }}
                level={5}
              >
                {title}
              </Title>
            </Tooltip>
          </Flex>

          <Flex {...listeners} style={{ cursor: "grab" }}>
            <MenuIcon className={styles.menuIcon} />
          </Flex>
        </Flex>
        <Tooltip mouseEnterDelay={0.5} title={description}>
          <Paragraph ellipsis={{ rows: 2 }} className={styles.desc}>
            {description}
          </Paragraph>
        </Tooltip>
        <Flex style={{ marginTop: "auto" }} gap={7}>
          {labels.map((label) => (
            <Label label={label} key={label} />
          ))}
        </Flex>
      </Card>
    </Dropdown>
  );
};

export default BoardContentCard;
