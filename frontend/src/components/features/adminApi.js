import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: '/admin/login', 
        method: 'POST',
        body: credentials, 
        headers: {
          'Content-Type': 'application/json', 
        },
      }),
    }),
  }),
});

export const { useAdminLoginMutation } = adminApi;
export default adminApi;