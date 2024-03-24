import { Button, Layout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const toastId = toast.loading("Logging out...");
    dispatch(logout());
    toast.success("Logged out", { id: toastId, duration: 2000 });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header style={{ backgroundColor: "#65CCB8", padding: "0 16px" }}>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <h2
              style={{
                margin: 0,
                flex: 1,
                fontFamily: "Great Vibes, cursive",
                fontSize: "2rem",
                fontWeight: "500",
                color: "rgb(4 64 28)",
              }}>
              Look At Me
            </h2>
            <Button
              type="text"
              onClick={handleLogout}
              icon={<LogoutOutlined />}>
              Logout
            </Button>
          </div>
        </Header>
        <Content
          style={{
            // margin: "24px 16px",
            padding: 24,
            background: "rgb(230 230 230)",
            minHeight: 360,
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
