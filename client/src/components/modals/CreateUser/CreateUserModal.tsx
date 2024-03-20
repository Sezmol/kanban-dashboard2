import { Form, Modal, Space } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../../../redux/services/user";
import {
  emailValidation,
  phoneValidation,
  textValidation,
} from "../../../utils/validation";
import { IController, IUser } from "../../../types/UsersTable";
import FormItem from "./Form/FormItem";
import FormFooter from "./Form/FormFooter";

type CreateUserModalProps = {
  handleCloseModal: () => void;
  rowData: IUser | null;
  isVisible: boolean;
};

const controllers: IController[] = [
  {
    name: "name",
    type: "input",
    rules: {
      required: "Name is required",
      pattern: { value: textValidation, message: "Name is not valid" },
    },
    renderProps: {
      inputProps: {
        placeholder: "Name",
      },
    },
  },
  {
    name: "surname",
    type: "input",
    rules: {
      required: "Surname is required",
      pattern: { value: textValidation, message: "Surname is not valid" },
    },
    renderProps: {
      inputProps: {
        placeholder: "Surname",
      },
    },
  },
  {
    name: "email",
    type: "input",
    rules: {
      required: "Email is required",
      pattern: { value: emailValidation, message: "Email is not valid" },
    },
    renderProps: {
      inputProps: {
        placeholder: "Email",
      },
    },
  },
  {
    name: "phone",
    type: "input",
    rules: {
      required: "Phone is required",
      pattern: { value: phoneValidation, message: "Phone is not valid" },
    },
    renderProps: {
      inputProps: {
        placeholder: "Phone",
      },
    },
  },
  {
    name: "birthday",
    type: "datePicker",
    rules: {
      required: "Date of birth is required",
    },
    renderProps: {
      inputProps: {
        placeholder: "Choose date of your birth",
        style: { width: "100%" },
      },
    },
  },
  {
    name: "roles",
    type: "select",
    rules: {
      required: "At least one role is required",
    },
    renderProps: {
      inputProps: {
        placeholder: "Please select roles",
        style: { width: "100%" },
      },
    },
  },
];

const defaultValues = {
  phone: "+7",
  name: "",
  surname: "",
  email: "",
  birthday: 0,
  roles: [],
};

const CreateUserModal = ({
  isVisible,
  handleCloseModal,
  rowData,
}: CreateUserModalProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IUser>({ defaultValues: defaultValues });

  useEffect(() => {
    if (rowData) {
      reset(rowData);
    }
  }, [rowData, reset]);

  const [createUser, { isLoading }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const closeModal = () => {
    reset(defaultValues);
    handleCloseModal();
  };

  const onSubmit: SubmitHandler<IUser> = (data) => {
    if (rowData) {
      const updatedUser = {
        ...rowData,
        ...data,
      };
      updateUser(updatedUser);
    } else {
      const newUser = {
        ...data,
        key: uuidv4(),
        id: uuidv4(),
      };
      createUser(newUser);
    }

    closeModal();
  };

  return (
    <Modal
      destroyOnClose
      title='Create User'
      footer={null}
      onCancel={closeModal}
      open={isVisible}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction='vertical' size='middle' style={{ width: "100%" }}>
          {controllers.map((controller) => (
            <FormItem
              key={controller.name}
              controller={controller}
              errors={errors}
              control={control}
              type={controller.type}
            />
          ))}

          <FormFooter
            rowData={rowData}
            closeModal={closeModal}
            isLoading={isLoading}
            isUpdating={isUpdating}
          />
        </Space>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
