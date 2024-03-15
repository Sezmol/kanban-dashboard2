import { FloatButton, Table, TableProps, Tag } from "antd";
import { useGetAllUsersQuery } from "../../redux/services/user";
import { IUser } from "../../types/UsersTable";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useReducer } from "react";
import CreateUserModal from "../modals/CreateUser/CreateUserModal";

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
        isModalVisible: true,
        rowData: null,
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
  const { data: users, isLoading } = useGetAllUsersQuery();

  const editRow = (user: IUser) => {
    dispatch({ type: ActionTypes.EDIT_USER, payload: user });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      // ASK
      onFilter: (value, record) => record.roles.includes(`${value}`),
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
        return <a onClick={() => editRow(record)}>Edit</a>;
      },
    },
  ];

  return (
    <>
      <Table
        style={{ padding: "0.5rem 1rem" }}
        columns={columns}
        dataSource={users}
        pagination={{
          position: ["bottomLeft"],
        }}
      />
      <FloatButton
        onClick={() => dispatch({ type: ActionTypes.OPEN_MODAL })}
        style={{ width: "3rem", height: "3rem" }}
        icon={
          <PlusCircleOutlined style={{ width: "1.5rem", height: "1.5rem" }} />
        }
      />

      <CreateUserModal
        rowData={rowData}
        handleCloseModal={() => dispatch({ type: ActionTypes.CLOSE_MODAL })}
        isVisible={isModalVisible}
      />
    </>
  );
};

export default TableContent;
