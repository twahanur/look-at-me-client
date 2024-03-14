import { useState } from "react";
import { allProduct } from "../../redux/features/product/productSlice";
import { useAppDispatch } from "../../redux/hooks";
import { TProduct } from "../../types/productTypes";
import { Spin, Button, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllProductApiQuery } from "../Product/productApi/getAllProduct";
import SaleProductTable from "./SaleProductTable";
import UiModal from "../../components/Modal/UiModal";

const { Option } = AutoComplete;

const Products = () => {
  const { data, isLoading } = useGetAllProductApiQuery("");

  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);

  if (isLoading) return <Spin size="large" />;

  const products: TProduct[] = data?.data?.result || [];
  dispatch(allProduct(products));

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filterSuggestions = (inputValue: string) => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleSearch = () => {
    // Find the selected product by name
    const product = products.find(
      (product) => product.name.toLowerCase() === searchValue.toLowerCase()
    );
    setSelectedProduct(product || null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <AutoComplete
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search products..."
          style={{ flex: 1, marginRight: "10px" }}>
          {filterSuggestions(searchValue).map((product) => (
            <Option key={product._id} value={product.name}>
              {product.name}
            </Option>
          ))}
        </AutoComplete>
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          Search
        </Button>
      </div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Our Products
      </h1>
      <SaleProductTable
        key={selectedProduct?._id}
        data={selectedProduct ? [selectedProduct] : products}
      />
      <UiModal />
    </div>
  );
};

export default Products;
