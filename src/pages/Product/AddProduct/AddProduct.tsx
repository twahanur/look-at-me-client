import { Button, Row, Col, message, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import UiForm from "../../../components/form/UiForm";
import UiInput from "../../../components/form/UiInput";
import { addProduct } from "../../../redux/features/product/productSlice";
import { useAddProductMutation } from "../../../redux/features/product/productApi";

const { Title } = Typography;

const AddProduct = () => {
  const [AddProduct, { data, isLoading }] = useAddProductMutation();

  console.log(data, isLoading);

  const { selectedProduct, addProducts } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();
  const nullValue = {
    name: "",
    price: "",
    quantity: "",
    frame_material: "",
    frame_shape: "",
    lens_type: "",
    brand: "",
    gender: "",
    color: "",
    temple_length: "",
    bridge_size: "",
  };
  let defaultValues = selectedProduct
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
  const onSubmit = (data: any) => {
    dispatch(addProduct(data));
    defaultValues = nullValue;
    message.success("Product added successfully!");
  };
  const uploadToDB = async () => {
    console.log(addProducts);
    await AddProduct(addProducts);
    message.success("Product uploaded successfully!");
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={18} lg={16} xl={14} xxl={12}>
        <Title level={2} style={{ marginBottom: "24px", textAlign: "center" }}>
          Add Product
        </Title>
        <UiForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <Row gutter={[16, 24]}>
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
              <UiInput
                type="text"
                name="frame_material"
                label="Frame Material"
              />
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
              <UiInput
                type="number"
                name="temple_length"
                label="Temple Length"
              />
            </Col>
            <Col xs={24} sm={12}>
              <UiInput type="number" name="bridge_size" label="Bridge Size" />
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "16px" }}>
                Add Product
              </Button>
              <Button type="primary" onClick={uploadToDB}>
                Upload Products
              </Button>
            </Col>
          </Row>
        </UiForm>
      </Col>
    </Row>
  );
};

export default AddProduct;
