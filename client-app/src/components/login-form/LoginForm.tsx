import React, { FC, useState } from 'react';
import { LofinFormFieldsType, LoginFormProps } from './models';
import cl from './LoginForm.module.scss';
import { Button, Form, Input } from 'antd';
import store from '@store';

const LoginForm: FC<LoginFormProps> = ({ handler: requestAuth, loading: authLoading, error: authError }) => {
  const { refreshAuth } = store.AuthStore;
  const [form] = Form.useForm<LofinFormFieldsType>();
  const [ showAuthError, setShowAuthError ] = useState(false);
  
  const onFinish = async () => {
    const { login, password } = form.getFieldsValue();
    if (!login || !password) return;
    const result = await requestAuth({
      login,
      password
    });
    if (result.success) {
      const token = result.token || '';
    
      refreshAuth(login, token);
    } else {
      setShowAuthError(true);
    }
  };

  return (
    <div className={cl.loginForm}>
      <Form
        form={form}
        layout='vertical'
        size='middle'
        onFinish={onFinish}
        onChange={() => setShowAuthError(false)}
      >
        <Form.Item 
          name="login"
          label="Логин" 
          requiredMark 
          rules={[
            { 
              required: true, 
              message: 'Обязательное поле!' 
            }]} 
        >
          <Input placeholder='Введите логин'/>
        </Form.Item>
        <Form.Item 
          name="password"
          label="Пароль" 
          requiredMark 
          rules={[{ required: true, message: 'Обязательное поле!' }]} 
        >
          <Input.Password placeholder='Введите пароль'/>
        </Form.Item>
        <div className={cl.buttonBlock}>
          <Button
            className={cl.buttonBlock__btn}
            htmlType="submit"
            loading={authLoading}
          >
            Войти
          </Button>
        </div>
        {showAuthError && <div className={cl.errorAuth}>Неверный E-mail или пароль</div>}
      </Form>
      
    </div>
  );
};

export { LoginForm };