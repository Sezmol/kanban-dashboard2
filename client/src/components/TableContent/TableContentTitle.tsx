import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Flex } from "antd";

interface TableContentTitleProps {
  title: string;

  setSort: (sortBy: string) => void;
  sort: string;
}

const TableContentTitle = ({
  title,
  setSort,
  sort,
}: TableContentTitleProps) => {
  const titleLC = title.toLowerCase().replaceAll(" ", "");

  console.log("titleLC", titleLC, "title", title, "sort", sort);

  return (
    <Flex justify='space-between'>
      {title}
      <a>
        {sort === titleLC ? (
          <SortDescendingOutlined onClick={() => setSort(`-${titleLC}`)} />
        ) : (
          <SortAscendingOutlined onClick={() => setSort(`${titleLC}`)} />
        )}
      </a>
    </Flex>
  );
};

export default TableContentTitle;
