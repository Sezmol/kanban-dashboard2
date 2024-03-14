import { FloatButton, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useGetAllUsersQuery } from "../../redux/services/user";
import { IUser } from "../../types/UsersTable";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateUserModal from "../modals/CreateUser/CreateUserModal";

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
    onFilter: (value, record) => record.roles.includes(value as string),
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
];

// const data = [
//   {
//     key: "1",
//     name: "Alex",
//     surname: "Brown",
//     dateOfBirth: "2000-02-15",
//     email: "john@gmail.com",
//     age: 32,
//     phone: "+1234567890",
//     roles: ["manager", "admin"],
//   },
//   {
//     key: "2",
//     name: "Charlie",
//     surname: "Green",
//     dateOfBirth: "1980-01-20",
//     email: "jim@gmail.com",
//     phone: "+1234567890",
//     age: 42,
//     roles: ["user"],
//   },
//   {
//     key: "3",
//     name: "Bob",
//     surname: "Black",
//     dateOfBirth: "1990-03-10",
//     email: "joe@gmail.com",
//     phone: "+1234567890",
//     age: 32,
//     roles: ["user", "manager"],
//   },
// ];

const TableContent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: users, isLoading } = useGetAllUsersQuery();

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table
        style={{ padding: "0.5rem 1rem" }}
        columns={columns}
        dataSource={users}
      />
      <FloatButton
        onClick={() => setIsModalVisible(true)}
        style={{ width: "3rem", height: "3rem" }}
        icon={
          <PlusCircleOutlined style={{ width: "1.5rem", height: "1.5rem" }} />
        }
      >
        ASdak
      </FloatButton>
      <CreateUserModal onCancel={handleCloseModal} isVisible={isModalVisible} />
    </>
  );
};

export default TableContent;
