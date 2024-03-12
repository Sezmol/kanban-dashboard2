import { Avatar, Flex, Card as AntdCard } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import MenuIcon from "../../../icons/MenuIcon";
import AvatarIcon from "../../../icons/AvatarIcon";
import { label } from "../../../types/BoardContent";

import styles from "./Card.module.scss";

type CardProps = {
  title: string;
  description: string;
  avatar?: string;
  labels: label[];
};

const Card = ({ title, description, avatar, labels }: CardProps) => {
  return (
    <AntdCard className={styles.card}>
      <Flex justify='space-between' align='center'>
        <Flex gap={"0.5rem"} align='center'>
          <Flex>
            <Avatar.Group size={20} maxCount={3}>
              <Avatar
                style={{ display: "flex", width: 20, height: 20 }}
                icon={<AvatarIcon />}
              />
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
        <Flex style={{ cursor: "pointer" }}>
          <MenuIcon className={styles.menuIcon} />
        </Flex>
      </Flex>
      <Paragraph className={styles.desc}>{description}</Paragraph>
      <Flex style={{ marginTop: "auto" }} gap={7}>
        {labels.map((label) => (
          <Flex
            align='center'
            justify='center'
            style={{ backgroundColor: label.bgColor, color: label.textColor }}
            className={styles.label}
            key={label.title}
          >
            {label.title}
          </Flex>
        ))}
      </Flex>
    </AntdCard>
  );
};

export default Card;
