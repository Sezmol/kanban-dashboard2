import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Flex } from "antd";

interface TableContentTitleProps {
  title: string;
  sortBy: string;
  setSort: (sortBy: string) => void;
}

const TableContentTitle = ({
  title,
  sortBy,
  setSort,
}: TableContentTitleProps) => {
  const titleLC = title.toLowerCase().replaceAll(" ", "");

  return (
    <Flex justify='space-between'>
      {title}
      <a>
        {sortBy === titleLC ? (
          <SortDescendingOutlined onClick={() => setSort(`-${titleLC}`)} />
        ) : (
          <SortAscendingOutlined onClick={() => setSort(`${titleLC}`)} />
        )}
      </a>
    </Flex>
  );
};

export default TableContentTitle;
