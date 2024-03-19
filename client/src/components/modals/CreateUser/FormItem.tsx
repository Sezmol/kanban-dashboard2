import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldErrors,
} from "react-hook-form";
import { DatePicker, Input, Select, SelectProps, Typography } from "antd";
import dayjs from "dayjs";

import { ControllersName, IController, IUser } from "../../../types/UsersTable";

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

interface FormItemProps {
  controller: IController;
  errors: FieldErrors<IUser>;
  control: Control<IUser, any>;
  type: "datePicker" | "select" | "input";
}

const FormItem = ({ controller, errors, control, type }: FormItemProps) => {
  const inputStatus = errors[controller.name] ? "error" : undefined;

  const fieldTypes: Record<
    string,
    (
      field: ControllerRenderProps<IUser, ControllersName>,
      inputStatus?: "error"
    ) => JSX.Element
  > = {
    datePicker: (field, status) => (
      <DatePicker
        {...controller.renderProps.inputProps}
        status={status}
        value={
          field.value && !(field.value instanceof Array)
            ? dayjs(field.value)
            : null
        }
        ref={field.ref}
        onBlur={field.onBlur}
        maxDate={dayjs(new Date())}
        onChange={(date) => field.onChange(date ? date.valueOf() : null)}
      />
    ),
    select: (field, status) => (
      <Select
        {...controller.renderProps.inputProps}
        {...field}
        status={status}
        mode='multiple'
        allowClear
        options={options}
      />
    ),
    input: (field, status) => (
      <Input
        {...field}
        {...controller.renderProps.inputProps}
        status={status}
        value={typeof field.value === "string" ? field.value : ""}
      />
    ),
  };

  const ErrorMessage = ({ error }: { error?: { message?: string } }) =>
    error ? <p style={{ color: "red" }}>{error.message}</p> : null;

  return (
    <Controller
      key={controller.name}
      name={controller.name}
      control={control}
      rules={controller.rules}
      render={({ field }) => (
        <>
          <Typography.Text>
            {controller.renderProps.inputProps.placeholder}
          </Typography.Text>
          {fieldTypes[type](field, inputStatus)}
          <ErrorMessage error={errors[controller.name]} />
        </>
      )}
    />
  );
};

export default FormItem;
