import React, { FC, useMemo, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';

import { CreateChatModalProps } from './models';
import cl from './CreateChatModal.module.scss';
import store from '@store';
import { ChatTypeEnum } from '@generated/graphql';

const CreateChatModal: FC<CreateChatModalProps> = ({
  onOk,
  headerText,
  okText,
  changeVisible
}) => {
  const { users, chatTypes } = store.AuthStore;
  const [form] = Form.useForm();
  const [ isOpen, setIsOpen] = useState<boolean>(false);

  const usersOptions: DefaultOptionType[] = useMemo(() => {
    return users.map((user) => ({
      value: user?._id,
      label: user?.login,
      id: user?._id
    }));
  }, [users]);

  const chatTypesOptions: DefaultOptionType[] = useMemo(() => {
    return chatTypes.map((type) => ({
      value: type?._id,
      label: type?.value,
      id: type?._id
    }));
  }, [chatTypes]);

  const changeVisibleModal = (visible: boolean) => {
    setIsOpen(visible);
  };
  changeVisible.current = changeVisibleModal;

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    const fields = form.getFieldsValue();
    onOk && onOk(fields);
    form.resetFields();
  };

  return (
    <Modal 
      className={cl.createChatModal}
      visible={isOpen}
      onCancel={handleCloseModal}
      okText={okText}
      onOk={handleOk}
      centered
    >
      <p className={cl.createChatModal_header}>{headerText}</p>
      <Form
        form={form}
        layout='vertical'
        size='middle'
        className={cl.form}
      >
        <Form.Item name="title">
          <Input
            placeholder='Write title chat'
          />
        </Form.Item>
        <Form.Item name="userIds">
          <Select
            options={usersOptions}
            placeholder='Select users'
            mode='multiple'
          />
        </Form.Item>
        <Form.Item name="typeId">
          <Select
            options={chatTypesOptions}
            placeholder='Select chat type'
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { CreateChatModal };