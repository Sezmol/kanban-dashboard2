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
import FormItem from "./FormItem";
import FormFooter from "./FormFooter";

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
    name: "dateOfBirth",
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
  } = useForm<IUser>({ defaultValues: { phone: "+7" } });

  useEffect(() => {
    if (rowData) {
      reset(rowData);
    }
  }, [rowData, reset]);

  const [createUser, { isLoading }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // ASK Почему данные остаются в форме

  const closeModal = () => {
    reset();
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
      <Form onFinish={handleSubmit(onSubmit)}>
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
      </Form>
    </Modal>
  );
};

export default CreateUserModal;

// {controllers.map((controller) => {
//   return (
//     <Controller
//       key={controller.name}
//       name={controller.name}
//       control={control}
//       rules={controller.rules}
//       render={({ field, fieldState }) => (
//         <>
//           <Typography.Text>
//             {`${controller.renderProps.inputProps.placeholder}:`}
//           </Typography.Text>
//           <Input
//             status={fieldState.error ? "error" : undefined}
//             {...field}
//             {...controller.renderProps.inputProps}
//           />
//           {errors[controller.name] && (
//             <p style={{ color: "red" }}>
//               {errors[controller.name]?.message}
//             </p>
//           )}
//         </>
//       )}
//     />
//   );
// })}
// {/* ASK */}
// <Controller
//   control={control}
//   name='dateOfBirth'
//   rules={{
//     required: {
//       value: true,
//       message: "Date of birth is required",
//     },
//   }}
//   render={({ field, fieldState }) => (
//     <>
//       <Typography.Text>Date of birth:</Typography.Text>
//       <DatePicker
//         status={fieldState.error ? "error" : undefined}
//         placeholder='Choose date of your birth'
//         style={{ width: "100%" }}
//         value={field.value ? dayjs(field.value) : null}
//         ref={field.ref}
//         onBlur={field.onBlur}
//         onChange={(date) =>
//           field.onChange(date ? date.valueOf() : null)
//         }
//       />

//       {errors.dateOfBirth && (
//         <p style={{ color: "red" }}>{errors.dateOfBirth?.message}</p>
//       )}
//     </>
//   )}
// />
// <Controller
//   control={control}
//   name='roles'
//   rules={{
//     required: {
//       value: true,
//       message: "Roles are required",
//     },
//   }}
//   render={({ field, fieldState }) => (
//     <>
//       <Typography.Text>Roles:</Typography.Text>
//       <Select
//         status={fieldState.error ? "error" : undefined}
//         mode='multiple'
//         allowClear
//         style={{ width: "100%" }}
//         placeholder='Please select roles'
//         options={options}
//         {...field}
//       />

//       {errors.roles && (
//         <p style={{ color: "red" }}>{errors.roles?.message}</p>
//       )}
//     </>
//   )}
// />
