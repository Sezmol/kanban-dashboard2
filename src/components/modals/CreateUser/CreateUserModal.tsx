import { useId } from "react";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  SelectProps,
  Space,
  Typography,
} from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import dayjs from "dayjs";
import { validation } from "../../../utils/validation";
import { useCreateUserMutation } from "../../../redux/services/user";
import { IUser } from "../../../types/UsersTable";

type CreateUserModalProps = {
  onCancel: () => void;
  onCreate?: () => void;
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

interface IModalInputs {
  name: "name" | "surname" | "dateOfBirth" | "email" | "phone";
  validator: string;
}

const modalInputs: IModalInputs[] = [
  {
    name: "name",
    validator: "text",
  },
  {
    name: "surname",
    validator: "text",
  },
  {
    name: "email",
    validator: "email",
  },
  {
    name: "phone",
    validator: "phone",
  },
];

const CreateUserModal = ({
  isVisible,
  onCancel,
  onCreate,
}: CreateUserModalProps) => {
  const { handleSubmit, control } = useForm<IUser>();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const key = useId();
  const onSubmit: SubmitHandler<IUser> = (data) => {
    console.log(data);
    createUser({ ...data, key });
    onCancel();
  };

  return (
    <Modal
      title='Create User'
      footer={null}
      onCancel={onCancel}
      onOk={onCreate}
      open={isVisible}
    >
      <Form onFinish={handleSubmit(onSubmit)}>
        <Flex vertical gap={"1rem"} style={{ width: "100%" }}>
          {modalInputs.map((input) => {
            return (
              <Controller
                key={input.name}
                name={input.name}
                defaultValue={input.name === "phone" ? "+7" : ""}
                control={control}
                rules={{ validate: validation[input.validator] }}
                render={({ field, fieldState }) => (
                  <Space direction='vertical'>
                    <Input
                      status={fieldState.error ? "error" : undefined}
                      placeholder={
                        input.name[0].toUpperCase() + input.name.slice(1)
                      }
                      {...field}
                    />

                    {fieldState.error && (
                      <Typography.Text type='danger'>
                        {fieldState.error.message}
                      </Typography.Text>
                    )}
                  </Space>
                )}
              />
            );
          })}

          <Controller
            control={control}
            rules={{ required: "Please enter a date of birth" }}
            name='dateOfBirth'
            render={({ field, fieldState }) => (
              <Space direction='vertical'>
                <DatePicker
                  status={fieldState.error ? "error" : undefined}
                  placeholder='Choose date of your birth'
                  style={{ width: "100%" }}
                  value={field.value ? dayjs(field.value) : null}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={(date) =>
                    field.onChange(date ? date.valueOf() : null)
                  }
                />
                {fieldState.error && (
                  <Typography.Text type='danger'>
                    {fieldState.error.message}
                  </Typography.Text>
                )}
              </Space>
            )}
          />

          <Controller
            control={control}
            name='roles'
            rules={{ required: "At least one role is required" }}
            render={({ field, fieldState }) => (
              <Space direction='vertical'>
                <Select
                  status={fieldState.error ? "error" : undefined}
                  mode='multiple'
                  allowClear
                  style={{ width: "100%" }}
                  placeholder='Please select roles'
                  options={options}
                  {...field}
                />
                {fieldState.error && (
                  <Typography.Text type='danger'>
                    {fieldState.error.message}
                  </Typography.Text>
                )}
              </Space>
            )}
          />

          <Flex justify='flex-end' gap={"1rem"}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button loading={isLoading} type='primary' htmlType='submit'>
              Submit
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
