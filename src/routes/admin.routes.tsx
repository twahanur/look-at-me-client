import AddProduct from "../pages/Product/AddProduct/AddProduct";
import Products from "../pages/Product/Products/Products";
import AddSalePage from "../pages/Sale/AddSale";
import AllSale from "../pages/Sale/AllSale";

export const adminPaths = [
  {
    name: "Products Management",
    children: [
      {
        name: "Products",
        path: "products",
        element: <Products />,
      },
      {
        name: "Add Product",
        path: "products/add-product",
        element: <AddProduct />,
      },
    ],
  },
  {
    name: "Sales Management",
    children: [
      {
        name: "Create Sale",
        path: "create-sale",
        element: <AddSalePage />,
      },
      {
        name: "All Sales",
        path: "get-sales",
        element: <AllSale />,
      },
    ],
  },
];
