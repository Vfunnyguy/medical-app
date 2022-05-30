import React from "react";
import {
  Tabs,
  Tab,
  TabContext,
  TabList,
  TabPanel,
} from "@/mui-import";
import Login from "../src/components/auth/Logincomponents/auth/Login";
import Register from "./Register
import { auth_img } from "@/utils";

const AuthPage = () => {
  const [tab, setTab] = React.useState("login");
  const handleChange = (e, newTab) => {
    setTab(newTab);
  };

  return (
    <div className="auth__page">
      <div className="auth__page-img">
        <img src={auth_img} alt="authpageimg" />
      </div>
      <div className="auth__page-right">
        <TabContext value={tab}>
          <TabList onChange={handleChange}>
            <Tab className='auth__page-tab' value="login" label={<h1>Đăng nhập</h1>} />
            <Tab value="register" label={<h1>Đăng ký</h1>}className='auth__page-tab' />
          </TabList>
          <TabPanel value="login">
            <Login />
          </TabPanel>
          <TabPanel value="register">
            <Register />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default AuthPage;
