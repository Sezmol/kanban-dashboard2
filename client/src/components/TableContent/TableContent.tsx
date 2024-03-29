import { useReducer, useState } from "react";
import {
  Flex,
  FloatButton,
  Pagination,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { IUser } from "../../types/UsersTable";
import CreateUserModal from "../modals/CreateUser/CreateUserModal";
import TableContentTitle from "./TableContentTitle";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../redux/services/user";
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from "antd/es/table/interface";

interface initialStateType {
  isModalVisible: boolean;
  rowData: IUser | null;
}

const initialState: initialStateType = {
  isModalVisible: false,
  rowData: null,
};

enum ActionTypes {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
  EDIT_USER = "EDIT_USER",
}

type IAction =
  | { type: ActionTypes.OPEN_MODAL }
  | { type: ActionTypes.CLOSE_MODAL }
  | { type: ActionTypes.EDIT_USER; payload: IUser };

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        rowData: null,
        isModalVisible: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        rowData: null,
        isModalVisible: false,
      };
    case "EDIT_USER":
      return {
        ...state,
        rowData: action.payload,
        isModalVisible: true,
      };
    default:
      return state;
  }
};

const TableContent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { rowData, isModalVisible } = state;
  const [sortBy, setSort] = useState("");
  const [filterRoles, setFilterRoles] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllUsersQuery({
    sortBy,
    page,
    filterRoles,
  });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const editRow = (user: IUser) => {
    dispatch({ type: ActionTypes.EDIT_USER, payload: user });
  };

  const deleteRow = (id: string) => {
    deleteUser(id);
  };

  const handleCloseModal = () => {
    dispatch({ type: ActionTypes.CLOSE_MODAL });
  };

  const handleOpenModal = () => {
    dispatch({ type: ActionTypes.OPEN_MODAL });
  };

  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IUser> | SorterResult<IUser>[]
  ) => {
    if (filters.roles) {
      setFilterRoles(`${filters.roles[0]}`);
    }
    if (!filters.roles) {
      setFilterRoles("");
    }
  };

  if (isLoading) {
    return (
      <Flex justify='center' align='center'>
        Loading...
      </Flex>
    );
  }

  const columns: TableProps<IUser>["columns"] = [
    {
      title: (
        <TableContentTitle title='Name' sortBy={sortBy} setSort={setSort} />
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <TableContentTitle title='Surname' sortBy={sortBy} setSort={setSort} />
      ),
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: (
        <TableContentTitle title='Birthday' sortBy={sortBy} setSort={setSort} />
      ),
      dataIndex: "birthday",
      key: "birthday",

      render: (_, { birthday }) => {
        return dayjs(birthday).format("DD.MM.YYYY");
      },
    },
    {
      title: (
        <TableContentTitle title='Email' sortBy={sortBy} setSort={setSort} />
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: (
        <TableContentTitle title='Phone' sortBy={sortBy} setSort={setSort} />
      ),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Roles",
      key: "roles",
      dataIndex: "roles",
      filters: [
        {
          text: "User",
          value: "user",
        },
        {
          text: "Manager",
          value: "manager",
        },
        {
          text: "Admin",
          value: "admin",
        },
      ],

      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            let color = "gray";

            switch (role) {
              case "admin":
                color = "warning";
                break;
              case "manager":
                color = "geekblue";
                break;
              case "user":
                color = "green";
                break;
              default:
                break;
            }
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => {
        return (
          <>
            {isDeleting ? (
              <LoadingOutlined />
            ) : (
              <Space>
                <a onClick={() => editRow(record)}>Edit</a>
                <a onClick={() => deleteRow(record.id)}>Delete</a>
              </Space>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table
        style={{ padding: "0.5rem 1rem" }}
        onChange={handleChange}
        columns={columns}
        dataSource={data?.data}
        pagination={false}
        bordered
      />
      <Pagination
        style={{ marginTop: "1rem" }}
        current={page}
        total={data?.items}
        onChange={(page) => setPage(page)}
      />
      <FloatButton
        onClick={handleOpenModal}
        style={{ width: "3rem", height: "3rem" }}
        icon={
          <PlusCircleOutlined style={{ width: "1.5rem", height: "1.5rem" }} />
        }
      />

      <CreateUserModal
        rowData={rowData}
        handleCloseModal={handleCloseModal}
        isVisible={isModalVisible}
      />
    </>
  );
};

export default TableContent;
