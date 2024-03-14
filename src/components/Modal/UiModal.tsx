import { Form, Button, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setModalVisible } from "../../redux/features/product/productSlice";
import UiForm from "../form/UiForm";
import UiInput from "../form/UiInput";
// import { useCreateSaleMutation } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { useCreateSaleMutation } from "../../redux/features/Sale/SaleApi";

const UiModal = () => {
  // const [selectedProduct] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [createSale] = useCreateSaleMutation();
  const { FormVisible, selectedProduct } = useAppSelector(
    (state) => state.product
  );

  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (v: any) => {
    const toastId = toast.loading("Creating sale...");
    try {
      const { _id } = selectedProduct;
      const { buyer, sale_date } = v;

      const productId = _id;
      const quantity_sold = parseInt(v.quantity_sold, 10);

      const product = {
        ...selectedProduct,
        productId,
        buyer,
        quantity_sold,
        sale_date,
      };
      const result = await createSale(product);
      console.log(result);
      toast.success("Thanks For your order", { id: toastId, duration: 2000 });
      form.resetFields();
      dispatch(setModalVisible(false));
    } catch (error) {
      toast.error(`Something went Wrong`, { id: toastId, duration: 2000 });
    }
  };
  const handleCancel = () => {
    dispatch(setModalVisible(false));
    form.resetFields();
  };

  return (
    <Modal
      title={`Sell ${selectedProduct}`}
      open={FormVisible}
      onCancel={handleCancel}
      footer={null}>
      <UiForm onSubmit={onSubmit}>
        <UiInput type="text" name="buyer" label="Buyer name" />
        <UiInput type="number" name="quantity_sold" label="Quantity" />
        <UiInput type="date" name="sale_date" label="Sale Date" />
        <Button htmlType="submit">Confirm Purses</Button>
      </UiForm>
    </Modal>
  );
};

export default UiModal;
