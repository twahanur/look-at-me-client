/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import { TSolesData } from "../../types/soldProductType";
interface SoldTableProps {
  data: TSolesData[];
}
const SoldProductTable: React.FC<SoldTableProps> = ({ data }) => {
  const columns = [
    {
      title: "Buyer",
      dataIndex: "buyer",
      key: "buyer",
    },
    {
      title: "Date Sold",
      dataIndex: "sale_date",
      key: "sale_date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Product Name",
      dataIndex: ["productId", "name"],
      key: "product_name",
    },
    {
      title: "Unit Price",
      dataIndex: ["productId", "price"],
      key: "productId",
      render: (price: any) => (
        <span>{`$${price || 0}
        `}</span>
      ),
    },
    {
      title: "Quantity Sold",
      dataIndex: "quantity_sold",
      key: "quantity_sold",
    },
    {
      title: "Total Price",
      key: "total_price",
      render: (data: any) => (
        <span>{`$${data?.quantity_sold * (data?.productId?.price || 0)}
        `}</span>
      ),
    },
    {
      title: "Sold By",
      dataIndex: ["soldBy", "username"],
      key: "soldBy",
    },
  ];

  const updatedData = data.map((soldData: TSolesData) => ({
    ...soldData,
    key: soldData._id, // Ensure each item has a unique key
  }));

  return <Table dataSource={updatedData} columns={columns} />;
};

export default SoldProductTable;
