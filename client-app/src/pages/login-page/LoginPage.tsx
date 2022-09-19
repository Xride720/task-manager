import { ClusterOutlined } from "@ant-design/icons";
import { LoginForm } from "@components/login-form";
import { RegistrationForm } from "@components/registration-form";
import { AuthControl } from "@hocs/mutations/AuthControl";
import { useAuth } from "@hooks";
import { GO_HOME } from "@routes";
import { Tabs } from "antd";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';

import cl from "./LoginPage.module.scss";
import { AuthLocationState, LoginTab } from "./models";

const { TabPane } = Tabs;

export const LoginPage: FC = observer(() => {
  const { isAuth } = useAuth();
  const [ activeTab, setActiveTab ] = useState<LoginTab>(LoginTab.Auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectLoginForm = () => {
    setActiveTab(LoginTab.Auth);
  };

  if (isAuth) {
    const locationState = location.state as AuthLocationState;
    if (locationState && locationState.from) {
      navigate(locationState.from.pathname);
    } else {
      navigate(GO_HOME);
    }
  }

  return (
    <div className={cl.loginPage}>
      <div className={cl.loginPage__logo}><ClusterOutlined className={cl.icon}/></div>
      <Tabs 
        activeKey={activeTab} 
        className={cl.loginPage__tabs}
        onChange={(activeKey) => setActiveTab(activeKey as LoginTab)}
        centered
      >
        <TabPane tab="Вход в систему" key={LoginTab.Auth}>
          <AuthControl 
            type="auth" 
            children={(props) => <LoginForm {...props}/>}  
          />
        </TabPane>
        <TabPane tab="Регистрация" key={LoginTab.Registration}>
          <AuthControl 
            type="registration"
            children={(props) => <RegistrationForm {...props} handleSelectLoginForm={handleSelectLoginForm} />}
          />
        </TabPane>
      </Tabs>
    </div>
  );
});