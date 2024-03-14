import {
  selectedProduct,
  setModalVisible,
} from "../../redux/features/product/productSlice";
import { useAppDispatch } from "../../redux/hooks";
import { TProduct } from "../../types/productTypes";
import { Table, Button, Space } from "antd";

interface SaleTableProps {
  data: TProduct[];
}
const SaleProductTable: React.FC<SaleTableProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const handleSell = (product: TProduct) => {
    dispatch(setModalVisible(true));
    dispatch(selectedProduct(product));
    console.log("Product Sold:", product);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Frame Material",
      dataIndex: "frame_material",
      key: "frame_material",
    },
    {
      title: "Frame Shape",
      dataIndex: "frame_shape",
      key: "frame_shape",
    },
    {
      title: "Lens Type",
      dataIndex: "lens_type",
      key: "lens_type",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Temple Length",
      dataIndex: "temple_length",
      key: "temple_length",
    },
    {
      title: "Bridge Size",
      dataIndex: "bridge_size",
      key: "bridge_size",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: TProduct) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleSell(record)}
            disabled={!selectedProduct}>
            Sell
          </Button>
        </Space>
      ),
    },
  ];

  // Add the sale data to the existing data
  const updatedData = data.map((product: TProduct) => ({
    ...product,
    key: product._id, // Assuming _id can be used as a unique key
  }));

  return <Table dataSource={updatedData} columns={columns} />;
};

export default SaleProductTable;
