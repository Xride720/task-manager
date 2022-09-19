import { Button, Form, Input } from 'antd';
import React, { FC, useState } from 'react';
import { RegistrationFormFieldsType, RegistrationFormProps } from './models';
import cl from './RegistrationForm.module.scss';

const RegistrationForm: FC<RegistrationFormProps> = ({
  handler: requestRegistration,
  loading: registrationLoading,
  error: registrationError,
  handleSelectLoginForm
}) => {

  const [form] = Form.useForm<RegistrationFormFieldsType>();
  const [ showAuthError, setShowAuthError ] = useState(false);

  const onFinish = async () => {
    const { login, email, password, repeatPassword } = form.getFieldsValue();

    if (!email || !password || !login) return;
    const result = await requestRegistration({
      login,
      email,
      password
    });
    if (result.success) {
      handleSelectLoginForm();
    } else {
      setShowAuthError(true);
    }
  };

  return (
    <div className={cl.registrationForm}>
      <Form
        form={form}
        layout='vertical'
        size='middle'
        onFinish={onFinish}
        onChange={() => setShowAuthError(false)}
      >
        <Form.Item 
          name="login" 
          label="Введите логин" 
          requiredMark 
          rules={[{ required: true, message: 'Обязательное поле!' }]}  
        >
          <Input placeholder='Введите логин'/>
        </Form.Item>
        <Form.Item 
          name="email" 
          label="Введите E-mail" 
          requiredMark 
          rules={[{ required: true, message: 'Обязательное поле!' }]}  
        >
          <Input placeholder='Введите E-mail'/>
        </Form.Item>
        <Form.Item 
          name="password"  
          label="Придумайте пароль" 
          requiredMark 
          hasFeedback
          rules={[{ required: true, message: 'Обязательное поле!' }]}  
        >
          <Input.Password placeholder='Введите новый пароль'/>
        </Form.Item>
        <Form.Item 
          name="repeat_password" 
          label="Повторите пароль"
          requiredMark 
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Обязательное поле!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Введенные пароли не совпадают!'));
              },
            }),
          ]}  
        >
          <Input.Password placeholder='Введите новый пароль еще раз'/>
        </Form.Item>
        <div className={cl.buttonBlock}>
          <Button
            className={cl.buttonBlock__btn}
            htmlType="submit"
            loading={registrationLoading}
          >
            Зарегистрироваться
          </Button>        
        </div>          
        {showAuthError && <div className={cl.errorRegistration}>Аккаунт с таким E-mail уже существует</div>}
      </Form>
      
    </div>
  );
};

export { RegistrationForm };