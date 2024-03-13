import { Avatar, Flex, Card as AntdCard, Dropdown, MenuProps } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import MenuIcon from "../../../icons/MenuIcon";
import { IBoardContentSectionCard } from "../../../types/BoardContent";

import styles from "./Card.module.scss";
import { getLabelColor } from "../../../utils/helpers";

const items: MenuProps["items"] = [
  {
    label: "Delete Task",
    key: "0",
  },
];

const Card = ({
  title,
  description,
  avatars,
  labels,
}: IBoardContentSectionCard) => {
  return (
    <AntdCard className={styles.card}>
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
            style={{
              maxWidth: "11.75rem",
              fontSize: 14,
              margin: 0,
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              textWrap: "nowrap",
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
      <Paragraph className={styles.desc}>{description}</Paragraph>
      <Flex style={{ marginTop: "auto" }} gap={7}>
        {labels.map((label, index) => (
          <Flex
            align='center'
            justify='center'
            style={getLabelColor(label)}
            className={styles.label}
            key={index}
          >
            {label}
          </Flex>
        ))}
      </Flex>
    </AntdCard>
  );
};

export default Card;
