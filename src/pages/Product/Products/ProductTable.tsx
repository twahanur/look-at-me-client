/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  deleteProduct,
  selectedProduct,
  setDeleteModalVisible,
  setModalVisible,
  setUpdateModalVisible,
} from "../../../redux/features/product/productSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { TProduct } from "../../../types/productTypes";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
interface ProductTableProps {
  data: TProduct[];
}

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  const [count, setCount] = useState(0);
  const [checkedItem, setCheckedItem] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleEdit = async (product: TProduct) => {
    console.log(product);
    dispatch(selectedProduct(product));
    dispatch(setUpdateModalVisible(true));
  };

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId));
    dispatch(setDeleteModalVisible(true));
  };

  const handleSell = (product: TProduct) => {
    dispatch(setModalVisible(true));
    console.log("Product Sold:", product);
  };

  const handleCheckboxChange = (productId: string, checked: boolean) => {
    if (checked) {
      setCount((prevCount) => prevCount + 1);
      setCheckedItem((prevCheckedItem) => [...prevCheckedItem, productId]);
    } else {
      setCount((prevCount) => prevCount - 1);
      setCheckedItem((prevCheckedItem) =>
        prevCheckedItem.filter((id) => id !== productId)
      );
    }
  };

  console.log("Product _id selected:", checkedItem);

  const columns = [
    {
      title: `Select ${count > 0 ? count : ""}`,
      render: (_: any, prod: TProduct) => (
        <input
          onChange={(e) =>
            handleCheckboxChange(prod._id as string, e.target.checked)
          }
          checked={checkedItem.includes(prod._id as string)} // Check if productId is in checkedItem
          type="checkbox"
          name="select"
          style={{ width: "20px", height: "20px" }}
        />
      ),
    },
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
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id as string)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return <Table dataSource={data} columns={columns} />;
};

export default ProductTable;
