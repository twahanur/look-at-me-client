import { allProduct } from "../../redux/features/product/productSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Button, Dropdown, Menu, Spin } from "antd";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import UpdateProductModal from "../../components/Modal/UpdateProductModal";
import { useGetAllSaleApiQuery } from "../../redux/features/Sale/SaleApi";
import SoldProductTable from "./SoldProductTable";
import { DownOutlined } from "@ant-design/icons";
import { useState, useEffect, SetStateAction } from "react";

const AllSale = () => {
  const [filter, setFilter] = useState("");
  const [salesData, setSalesData] = useState<any[]>([]);
  const { data, isLoading, isError } = useGetAllSaleApiQuery(filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setSalesData(data.data || []);
      dispatch(allProduct(data.data || []));
    }
  }, [isLoading, isError, data, dispatch, setFilter]);

  const handleFilterSelect = (filterType: SetStateAction<string>) => {
    console.log(filterType);
    setFilter(filterType);
  };

  const menu = (
    <Menu onClick={(e) => handleFilterSelect(e.key)}>
      <Menu.Item key="daily">Daily</Menu.Item>
      <Menu.Item key="weekly">Weekly</Menu.Item>
      <Menu.Item key="monthly">Monthly</Menu.Item>
      <Menu.Item key="yearly">Yearly</Menu.Item>
      <Menu.Item key="">All Time</Menu.Item>
    </Menu>
  );

  if (isLoading) return <Spin size="large" />;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>All Sales</h1>
      <Dropdown overlay={menu}>
        <Button>
          {filter} <DownOutlined />
        </Button>
      </Dropdown>
      <SoldProductTable key={salesData[0]} data={salesData} />
      <ConfirmationModal />
      <UpdateProductModal />
    </div>
  );
};

export default AllSale;
