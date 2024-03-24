import { useEffect, useState } from "react";
import { allProduct } from "../../../redux/features/product/productSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { TProduct } from "../../../types/productTypes";
import { useGetAllProductApiQuery } from "../productApi/getAllProduct";
import { Spin, Button, AutoComplete, Checkbox, Divider } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import ConfirmationModal from "./../../../components/Modal/ConfirmationModal";
import ProductTable from "./ProductTable";
import UpdateProductModal from "../../../components/Modal/UpdateProductModal";
import UiModal from "../../../components/Modal/UiModal";
import { nullFilterValue } from "../../../utils/defaultValues";
import { useDeleteProductMutation } from "../../../redux/features/product/productApi";

const { Option } = AutoComplete;

const Products = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [checkedItem, setCheckedItem] = useState<string[]>([]);
  const { data, isLoading, isError } = useGetAllProductApiQuery("");
  const [deleteProduct] = useDeleteProductMutation();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<any>(nullFilterValue);

  // const products: TProduct[] = data?.data?.result || [];
  // dispatch(allProduct(products));

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setProducts(data?.data?.result || []);
      dispatch(allProduct(data.data || []));
    }
  }, [isLoading, data, isError, dispatch]);

  if (isLoading) return <Spin size="large" />;
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filterSuggestions = (inputValue: string) => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleSearch = () => {
    const product = products.find(
      (product) => product.name.toLowerCase() === searchValue.toLowerCase()
    );
    setSelectedProduct(product || null);
  };

  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handleFilterChange = (value: any, type: string) => {
    setFilters({ ...filters, [type]: value });
  };

  const applyFilters = (product: TProduct): boolean => {
    if (
      filters.frame_material.length > 0 &&
      !filters.frame_material.includes(product.frame_material)
    ) {
      return false;
    }
    if (filters.gender.length > 0 && !filters.gender.includes(product.gender)) {
      return false;
    }
    if (filters.color.length > 0 && !filters.color.includes(product.color)) {
      return false;
    }

    return true;
  };

  const handleBulkDeleteProduct = () => {
    checkedItem.forEach((item) => {
      console.log(item);
      deleteProduct(item);
    });
    // console.log("haldleBulkDeleteProduct", checkedItem);
  };

  const filteredProducts = products.filter((product) => applyFilters(product));

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
            <Option key={product?._id} value={product?.name}>
              {product.name ? product.name : "No Product Found"}
            </Option>
          ))}
        </AutoComplete>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearch}
          style={{ marginRight: "10px" }}>
          Search
        </Button>
        <Button
          icon={<FilterOutlined />}
          onClick={handleToggleFilters}
          style={{ marginBottom: "10px" }}>
          Filter
        </Button>
      </div>
      {showFilters && (
        <div>
          <div
            style={{
              marginBottom: "20px",
              justifyContent: "space-between",
              display: "flex",
            }}>
            <div style={{ flex: 1 }}>
              <Divider orientation="center">Frame Material</Divider>
              <Checkbox.Group
                options={["Metal", "Plastic", "Acetate"]}
                onChange={(values) =>
                  handleFilterChange(values, "frameMaterial")
                }
              />
            </div>

            <div style={{ flex: 1, paddingLeft: 30 }}>
              <Divider orientation="left">Gender</Divider>
              <Checkbox.Group
                options={["Men", "Women", "Unisex"]}
                onChange={(values) => handleFilterChange(values, "gender")}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Divider orientation="left">Color</Divider>
              <Checkbox.Group
                options={["Black", "Brown", "Blue"]}
                onChange={(values) => handleFilterChange(values, "color")}
              />
            </div>
          </div>
          <Button
            type="primary"
            onClick={handleToggleFilters}
            style={{ marginBottom: "20px" }}>
            Apply Filters
          </Button>
        </div>
      )}

      <div>
        <span
          style={{
            textAlign: "center",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            fontSize: "2rem",
          }}>
          Our Products
        </span>
        <Button
          style={{
            display: "inline-block",
            alignItems: "end",
          }}
          onClick={handleBulkDeleteProduct}>
          Delete Selected
        </Button>
      </div>

      <ProductTable
        setCheckedItem={setCheckedItem}
        checkedItem={checkedItem}
        key={selectedProduct?._id}
        data={selectedProduct ? [selectedProduct] : filteredProducts}
      />
      <UiModal />
      <ConfirmationModal />
      <UpdateProductModal />
    </div>
  );
};

export default Products;
