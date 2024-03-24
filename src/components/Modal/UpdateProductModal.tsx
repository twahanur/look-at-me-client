import { Button, Row, Col } from "antd";
import { Form, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUpdateModalVisible } from "../../redux/features/product/productSlice";
import UiForm from "../form/UiForm";
import UiInput from "../form/UiInput";
import { useUpdateProductMutation } from "../../redux/features/product/productApi";
import { nullValue } from "../../utils/defaultValues";

const UpdateProductModal = () => {
  const dispatch = useAppDispatch();
  const { UpdateFormVisible } = useAppSelector((state) => state.product);

  const [UpdateProduct] = useUpdateProductMutation();
  const { selectedProduct } = useAppSelector((state) => state.product);

  const defaultValues = selectedProduct
    ? {
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: selectedProduct.quantity,
        frame_material: selectedProduct.frame_material,
        frame_shape: selectedProduct.frame_shape,
        lens_type: selectedProduct.lens_type,
        brand: selectedProduct.brand,
        gender: selectedProduct.gender,
        color: selectedProduct.color,
        temple_length: selectedProduct.temple_length,
        bridge_size: selectedProduct.bridge_size,
      }
    : nullValue;
  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (v: any) => {
    const { _id } = selectedProduct;
    const productInfo = { ...v, _id };
    await UpdateProduct(productInfo);
    form.resetFields();
    dispatch(setUpdateModalVisible(false));
  };
  const handleCancel = () => {
    dispatch(setUpdateModalVisible(false));
    // dispatch(selectedProduct(nullValue));
    form.resetFields();
  };

  return (
    <Modal
      title={`Update ${selectedProduct.name}`}
      open={UpdateFormVisible}
      onCancel={handleCancel}
      footer={null}>
      <UiForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <UiInput type="text" name="name" label="Name" />
          </Col>
          <Col xs={24} sm={12}>
            <UiInput type="number" name="price" label="Price" />
          </Col>
          <Col xs={24} sm={12}>
            <UiInput type="number" name="quantity" label="Quantity" />
          </Col>
          <Col xs={24} sm={12}>
            <UiInput type="text" name="frame_material" label="Frame Material" />
          </Col>
          <Col xs={24} sm={12}>
            <UiInput type="text" name="frame_shape" label="Frame Shape" />
          </Col>
          <Col xs={24} sm={12}>
            <UiInput type="text" name="lens_type" label="Lens Type" />
          </Col>
          <Col xs={24} sm={12}>
            <UiInput type="text" name="brand" label="Brand" />
          </Col>
          <Col xs={24} sm={12}>
            <UiInput type="text" name="gender" label="Gender" />
          </Col>
          <Col xs={24} sm={12}>
            <UiInput type="text" name="color" label="Color" />
          </Col>
          <Col xs={24} sm={12}>
            <UiInput type="number" name="temple_length" label="Temple Length" />
          </Col>
          <Col xs={24} sm={12}>
            <UiInput type="number" name="bridge_size" label="Bridge Size" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" style={{ marginTop: "16px" }}>
          Update Product
        </Button>
      </UiForm>
    </Modal>
  );
};

export default UpdateProductModal;
