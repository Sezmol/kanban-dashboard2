import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types/UsersTable";

const BASE_URL = "http://localhost:5000";

interface IUserWithKey extends IUser {
  key: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => `/table`,
    }),
    createUser: builder.mutation<IUser, IUserWithKey>({
      query: (user) => ({
        url: `/table`,
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useCreateUserMutation } = usersApi;
