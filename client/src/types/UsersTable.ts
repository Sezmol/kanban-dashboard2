export interface IUser {
  id: string;
  key: string;
  birthday: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  roles: string[];
}

export type ControllersName =
  | "name"
  | "surname"
  | "email"
  | "phone"
  | "birthday"
  | "roles";

export interface IController {
  type: "datePicker" | "select" | "input";
  name: ControllersName;
  rules: {
    required: string;
    pattern?: { value: RegExp; message: string };
  };
  renderProps: {
    inputProps: {
      placeholder: string;
      style?: { width: "100%" };
    };
  };
}
