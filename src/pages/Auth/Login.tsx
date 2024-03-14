import { FieldValues } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { Button, Row } from "antd";
import { TUser, setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UiForm from "../../components/form/UiForm";
import UiInput from "../../components/form/UiInput";

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
    const toastId = toast.loading("logging in...");
    try {
      const userInfo = {
        username: data.username,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/products`);
    } catch (error) {
      toast.error(`Login Failed`, { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <UiForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <UiInput type="text" name="username" label="Username" />
        <UiInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </UiForm>
    </Row>
  );
};

export default Login;
