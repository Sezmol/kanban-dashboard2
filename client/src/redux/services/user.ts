import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types/UsersTable";

const BASE_URL = "http://localhost:5000";

interface queryParams {
  sortBy?: string;
  page?: number;
}

interface pageData {
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number | null;
  pages: number;
  items: number;
  data: IUser[];
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<pageData, queryParams>({
      query: ({ sortBy, page }) => `/table/?_sort=${sortBy}&_page=${page}`,
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
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/table/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
