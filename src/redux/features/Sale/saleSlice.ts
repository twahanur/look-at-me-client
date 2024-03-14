import { createSlice } from "@reduxjs/toolkit";
import { TSolesData } from "../../../types/soldProductType";

type TSaleState = {
  allSales: TSolesData[];
  saleHistoryDuration: string;
};

const initialState: TSaleState = {
  allSales: [],
  saleHistoryDuration: "",
};

const saleSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    allProduct: (state, action) => {
      state.allSales = action.payload;
    },
    saleHistoryDuration: (state, action) => {
      state.allSales = action.payload;
    },
  },
});

export const { allProduct, saleHistoryDuration } = saleSlice.actions;
export default saleSlice.reducer;
