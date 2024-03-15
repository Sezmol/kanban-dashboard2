export interface IUser {
  id: string;
  key: string;
  dateOfBirth: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  roles: string[];
}

export interface IUserResponse extends Omit<IUser, "dateOfBirth"> {
  id: string;
  key: string;
  dateOfBirth: string;
}
