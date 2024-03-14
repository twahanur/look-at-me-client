import { createSlice } from "@reduxjs/toolkit";
import { TInitialProduct, TProduct } from "../../../types/productTypes";

type TProductState = {
  FormVisible: boolean;
  UpdateFormVisible: boolean;
  DeleteFormVisible: boolean;
  deleteProduct: string[];
  selectedProduct: TProduct;
  allProducts: TProduct[];
  addProducts: TProduct[];
};

const initialState: TProductState = {
  deleteProduct: [],
  FormVisible: false,
  DeleteFormVisible: false,
  UpdateFormVisible: false,
  selectedProduct: TInitialProduct,
  allProducts: [],
  addProducts: [],
};

const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setModalVisible: (state, action) => {
      state.FormVisible = action.payload;
    },
    setDeleteModalVisible: (state, action) => {
      state.DeleteFormVisible = action.payload;
    },
    setUpdateModalVisible: (state, action) => {
      state.UpdateFormVisible = action.payload;
    },
    selectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    allProduct: (state, action) => {
      state.allProducts = action.payload;
    },
    addProduct: (state, action) => {
      state.addProducts.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.deleteProduct.push(action.payload);
    },
  },
});

export const {
  setDeleteModalVisible,
  selectedProduct,
  allProduct,
  addProduct,
  deleteProduct,
  setUpdateModalVisible,
  setModalVisible,
} = productSlice.actions;
export default productSlice.reducer;
