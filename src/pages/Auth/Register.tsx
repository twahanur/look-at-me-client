// Register.js
import { Button, Row, Col } from "antd";
import UiForm from "../../components/form/UiForm";
import UiInput from "../../components/form/UiInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUserCredential } from "../../redux/features/auth/authSlice";
import "./authDesign.css";
const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Signing up....");
    try {
      const userInfo = {
        username: data.username,
        password: data.password,
      };
      console.log(userInfo);
      const res = await signUp(userInfo).unwrap();
      console.log("response=>", res);
      toast.success("Sign up successful", { id: toastId, duration: 2000 });
      dispatch(setUserCredential(userInfo));
      navigate(`/login`);
    } catch (error) {
      console.log(error);
      toast.error(`Registration Failed`, { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col className="animatedBox" xs={20} sm={16} md={12} lg={8}>
        <div
          className="borderAnimation"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <div className="before"></div>
          <div className="after"></div>
        </div>
        <div
          className="formBox"
          style={{
            padding: "20px",
            border: "1px solid #eee",
            borderRadius: "8px",
            backgroundColor: "transparent",
          }}>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Create an Account
          </h1>
          <UiForm onSubmit={onSubmit}>
            <UiInput type="text" name="username" label="Username" />
            <UiInput type="password" name="password" label="Password" />
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Sign Up
            </Button>
          </UiForm>
          <p style={{ marginTop: "20px", textAlign: "center" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Register;
