import { Button, Row } from "antd";
import UiForm from "../../components/form/UiForm";
import UiInput from "../../components/form/UiInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUserCredential } from "../../redux/features/auth/authSlice";
const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("signing up....");
    try {
      const userInfo = {
        username: data.username,
        password: data.password,
      };
      console.log(userInfo);
      const res = await signUp(userInfo).unwrap();
      console.log("response=>", res);
      toast.success("Sign up successfully", { id: toastId, duration: 2000 });
      dispatch(setUserCredential(userInfo));
      navigate(`/login`);
    } catch (error) {
      console.log(error);
      toast.error(`Registration Failed`, { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <UiForm onSubmit={onSubmit}>
        <UiInput type="text" name="username" label="Username" />
        <UiInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </UiForm>
    </Row>
  );
};

export default Register;
