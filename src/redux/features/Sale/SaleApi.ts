// import { baseApi } from "../../../redux/api/baseApi";

import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSale: builder.mutation({
      query: (saleInfo) => ({
        url: "/sale",
        method: "POST",
        body: saleInfo,
      }),
    }),
    getAllSaleApi: builder.query({
      query: (period) => {
        const params = new URLSearchParams();
        params.append("period", period);
        return {
          url: `/sale`,
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const { useGetAllSaleApiQuery, useCreateSaleMutation } = productApi;
