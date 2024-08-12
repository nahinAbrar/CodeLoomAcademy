import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
        url: `get-order`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {useGetAllOrdersQuery} = ordersApi;
