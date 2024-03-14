/* eslint-disable @typescript-eslint/no-explicit-any */
export type TProduct = {
  priceRange: any;
  image: string | undefined;
  _id?: string;
  name: string;
  price: number;
  quantity: number;
  frame_material: string;
  frame_shape: string;
  lens_type: string;
  brand: string;
  gender: string;
  color: string;
  temple_length: number;
  bridge_size: number;
};
export const TInitialProduct = {
  _id: "",
  priceRange: 0 || {} || "",
  name: "",
  price: 0,
  quantity: 0,
  frame_material: "",
  frame_shape: "",
  lens_type: "",
  brand: "",
  gender: "",
  color: "",
  temple_length: 0,
  bridge_size: 0,
  image: "",
};
