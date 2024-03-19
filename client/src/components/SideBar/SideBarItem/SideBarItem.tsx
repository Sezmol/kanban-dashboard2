import { Avatar, Typography } from "antd";

interface SideBarItemProps {
  title: string;
  icon: string;
}

const SideBarItem = ({ title, icon }: SideBarItemProps) => {
  return (
    <>
      <Avatar style={{ width: "1.5rem", height: "1.5rem" }} src={icon} />
      <Typography.Text>{title}</Typography.Text>
    </>
  );
};

export default SideBarItem;
