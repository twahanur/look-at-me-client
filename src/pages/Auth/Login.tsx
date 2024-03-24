// Login.js
import { Button, Row, Col } from "antd";
import UiForm from "../../components/form/UiForm";
import UiInput from "../../components/form/UiInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import "./authDesign.css";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username, password } = useAppSelector((state) => state.auth);
  let defaultValues;
  if (username !== null && password !== null) {
    defaultValues = {
      username: username,
      password: password,
    };
  } else {
    defaultValues = {
      username: "",
      password: "",
    };
  }
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const userInfo = {
        username: data.username,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/user/products`);
    } catch (error) {
      toast.error(`Login Failed`, { id: toastId, duration: 2000 });
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
          <h1 style={{ textAlign: "center", marginBottom: "20px", zIndex: 2 }}>
            Login
          </h1>

          <UiForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <UiInput type="text" name="username" label="Username" />
            <UiInput type="password" name="password" label="Password" />
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </UiForm>
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: "red",
            }}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
