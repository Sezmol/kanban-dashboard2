import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types/UsersTable";

const BASE_URL = "http://localhost:5000";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => `/table`,
      providesTags: ["User"],
    }),
    createUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/table`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/table/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersApi;
