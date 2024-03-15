import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  SelectProps,
} from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { Rule } from "antd/es/form";

import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../../../redux/services/user";
import { phoneValidation, textValidation } from "../../../utils/validation";
import { IUser } from "../../../types/UsersTable";
import { v4 as uuidv4 } from "uuid";

type CreateUserModalProps = {
  handleCloseModal: () => void;
  rowData: IUser | null;
  isVisible: boolean;
};
const options: SelectProps["options"] = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "User",
    value: "user",
  },
  {
    label: "Manager",
    value: "manager",
  },
];

interface IControllers {
  name: "name" | "surname" | "email" | "phone";
  renderProps: {
    formFieldProps: {
      name: string;
      label: string;
      rules: Rule[];
    };
    inputProps: {
      placeholder: string;
      style?: { width: "100%" };
    };
  };
}

const controllers: IControllers[] = [
  {
    name: "name",
    renderProps: {
      formFieldProps: {
        name: "name",
        label: "Name",
        rules: [
          { min: 2, required: true, type: "string", pattern: textValidation },
        ],
      },
      inputProps: {
        placeholder: "Name",
        style: { width: "100%" },
      },
    },
  },
  {
    name: "surname",
    renderProps: {
      formFieldProps: {
        name: "surname",
        label: "Surname",
        rules: [
          { min: 2, required: true, type: "string", pattern: textValidation },
        ],
      },
      inputProps: {
        placeholder: "Surname",
        style: { width: "100%" },
      },
    },
  },
  {
    name: "email",
    renderProps: {
      formFieldProps: {
        name: "email",
        label: "Email",
        rules: [{ required: true, type: "email" }],
      },
      inputProps: {
        placeholder: "Email",
        style: { width: "100%" },
      },
    },
  },
  {
    name: "phone",
    renderProps: {
      formFieldProps: {
        name: "phone",
        label: "Phone",
        rules: [{ required: true, pattern: phoneValidation }],
      },
      inputProps: {
        placeholder: "Phone",
        style: { width: "100%" },
      },
    },
  },
];

const validateMessages = {
  pattern: {
    mismatch: "${label} is not valid",
  },
};

const CreateUserModal = ({
  isVisible,
  handleCloseModal,
  rowData,
}: CreateUserModalProps) => {
  const [form] = Form.useForm();
  const { handleSubmit, control } = useForm<IUser>();

  const [createUser, { isLoading }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const closeModal = () => {
    handleCloseModal();
    form.resetFields();
  };

  const onSubmit: SubmitHandler<IUser> = (data) => {
    const newUser = {
      ...data,
      dateOfBirth: dayjs(data.dateOfBirth).format("DD.MM.YYYY"),
      key: uuidv4(),
      id: uuidv4(),
    };

    if (rowData) {
      updateUser(data);
    }
    createUser(newUser);
    closeModal();
    form.resetFields();
  };

  return (
    <Modal
      destroyOnClose
      title='Create User'
      footer={null}
      onCancel={closeModal}
      open={isVisible}
    >
      <Form
        form={form}
        validateMessages={validateMessages}
        onFinish={handleSubmit(onSubmit)}
        initialValues={
          rowData
            ? { ...rowData, dateOfBirth: dayjs(rowData.dateOfBirth) }
            : { phone: "+7" }
        }
      >
        {controllers.map((controller) => {
          return (
            <Controller
              key={controller.name}
              name={controller.name}
              control={control}
              render={({ field }) => (
                <Form.Item {...controller.renderProps.formFieldProps}>
                  <Input {...field} {...controller.renderProps.inputProps} />
                </Form.Item>
              )}
            />
          );
        })}
        {/* ASK */}
        <Controller
          control={control}
          rules={{ required: "Please enter a date of birth" }}
          name='dateOfBirth'
          render={({ field }) => (
            <Form.Item
              name='dateOfBirth'
              label='Date of birth'
              validateTrigger='onBlur'
              rules={[{ required: true }]}
            >
              <DatePicker
                placeholder='Choose date of your birth'
                style={{ width: "100%" }}
                value={field.value ? dayjs(field.value) : null}
                ref={field.ref}
                onBlur={field.onBlur}
                onChange={(date) =>
                  field.onChange(date ? date.valueOf() : null)
                }
              />
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name='roles'
          rules={{ required: "At least one role is required" }}
          render={({ field, fieldState }) => (
            <Form.Item
              name='roles'
              label='Roles'
              validateFirst={true}
              rules={[{ required: true }]}
            >
              <Select
                status={fieldState.error ? "error" : undefined}
                mode='multiple'
                allowClear
                style={{ width: "100%" }}
                placeholder='Please select roles'
                options={options}
                {...field}
              />
            </Form.Item>
          )}
        />

        <Flex justify='flex-end' gap={"1rem"}>
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            onClick={closeModal}
            loading={isLoading}
            type='primary'
            htmlType='submit'
          >
            Submit
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
