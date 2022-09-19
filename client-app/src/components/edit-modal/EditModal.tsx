import React, { FC, useEffect, useMemo, useState } from 'react';
import { EditModalProps, FieldItemType } from './models';
import cl from './EditModal.module.scss';
import { Form, Modal } from 'antd';
import { requiredArr, taskDescriptionFields } from './constants';
import { useCustomInput } from './customHooks';
import moment from 'moment';
import { Task } from '@generated/graphql';

const EditModal: FC<EditModalProps> = ({
  changeVisible,
  okText,
  onOk,
  data,
  headerText,
  item,
}) => {
  const [ isOpen, setIsOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  
  const initialData = useMemo(() => {
    return data.reduce((acc, curr) => ({ ...acc, [curr.propertyKey]: curr.value }), {});
  }, [data]);

  const changeVisibleModal = (visible: boolean) => {
    setIsOpen(visible);
  };
  changeVisible.current = changeVisibleModal;

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue(initialData)
  }, [initialData]);

  const handleOk = () => {
    onOk && onOk(form.getFieldsValue());
  };

  const { getInputObj } = useCustomInput({
    onChangeSelect: () => {}
  });
  
  const formFields = useMemo(() => {
    const convertFieldData = (fieldData: FieldItemType<keyof Task>) => {
      const { propertyKey, hidden = false, label } = fieldData;
      const { inputComponent, valuePropName, buttons } = getInputObj(fieldData);
      const formItem = (
        <Form.Item
          key={propertyKey}
          valuePropName={valuePropName || undefined}
          name={propertyKey}
          label={label || propertyKey}
          hidden={hidden}
          rules={[{ required: requiredArr.includes(propertyKey), message: 'Обязательное поле!' }]}
        >
          {inputComponent}
        </Form.Item>
      );
      return !buttons ? (
        formItem
      ) : (
        <div className={cl.formItemWithBtn} key={propertyKey}>
          {formItem}
          {buttons}
        </div>
      );
    };
    return {
      main: data.filter(item => item.formSection === 'main' ).map(convertFieldData),
      sidebar: data.filter(item => item.formSection === 'sidebar' ).map(convertFieldData)
    };

  }, [data]);

  const descriptionFields = useMemo(() => {
    return taskDescriptionFields.map((desc, i) => {
      if (item[desc.key]) {
        return desc.type === 'date' ?
        <p key={desc.key} className={cl.editModal_creationDate}>{desc.title}: {moment(item[desc.key]).format("DD.MM.YY HH:mm")}</p>
        :
        <p key={desc.key} className={cl.editModal_creationDate}>{desc.title}: {item[desc.key]}</p>
      }
      return <React.Fragment key={desc.key}></React.Fragment>;
    });
  }, [item]);

  return (
    <Modal 
      className={cl.editModal}
      visible={isOpen}
      onCancel={handleCloseModal}
      okText={okText}
      onOk={handleOk}
      centered
    >
      <p className={cl.editModal_header}>{headerText}</p>
      <Form
        form={form}
        layout='vertical'
        size='middle'
        initialValues={initialData}
        className={cl.form}
      >
        <div className={cl.formMain}>
          {formFields.main}
        </div>
        <div className={cl.formSidebar}>
          {formFields.sidebar}
          {descriptionFields}
        </div>
      </Form>
    </Modal>
  );
};

export { EditModal };