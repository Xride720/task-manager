import { CreateChatModalProps } from '@components/create-chat-modal/models';
import { Task, User } from '@generated/graphql';
import { TaskStateOptionArr } from '@pages/task-list-page/constants';
import { TaskListModalPropsType } from '@store/taskList/types';
import { Input, Radio, Select, Space, Switch } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useCallback, useMemo } from 'react';
import { FieldEnum, FieldItemType, InputPropertyType, OptionType } from './models';

export const convertToOptionsArr = (arr: OptionType[] | undefined) => {
  return arr?.map((item) => ({
        item,
        key: item.id,
        value: item.id,
        label: item.name,
      })) || [];
};

export const useCustomInput = (data: {
  onChangeSelect?: (_: any, keyMap: string[][]) => void;
}) => {
  const { onChangeSelect } = data;

  const handleFilterSelectOption = (
    inputValue: string,
    option?: {
      label: string;
    },
  ): boolean => {
    return option ? (option.label || '').toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) : true;
  };

  const defaultSelect = (src: {
    key: string;
    label: string;
    propertyKey: string;
    catalog: OptionType[];
  }) => ({
    inputComponent: (
      <Select
        options={convertToOptionsArr(src.catalog || [])}
        onChange={(value, option) => onChangeSelect && onChangeSelect(option, [])}
        showSearch
        allowClear
        key={src.propertyKey}
        filterOption={handleFilterSelectOption}
      />
    ),
    buttons: undefined,
    hidden: false,
    label: src.label,
  });

  const hiddenInput = () => ({
    inputComponent: <Input />,
    hidden: true,
  });

  const getInputObj = useCallback(
    (fieldData: FieldItemType): InputPropertyType => {
      switch (true) {
        case fieldData.type === FieldEnum.Select: {
          const { propertyKey, catalog, label } = fieldData;

          return defaultSelect({
            key: propertyKey || 'id',
            label: label || '',
            catalog: catalog || [],
            propertyKey: propertyKey || '',
          });
        }
        case fieldData.type === FieldEnum.Switch: {
          const { propertyKey, catalog, label } = fieldData;

          return {
            inputComponent: <Switch />,
            valuePropName: 'checked'
          };
        }
        case fieldData.type === FieldEnum.Radio: {
          const { propertyKey, catalog, label, catalogDirection } = fieldData;

          return {
            inputComponent: (
              <Radio.Group>
                <Space direction={catalogDirection}>
                {
                  catalog?.map(item => (
                    <Radio value={item.id} key={item.id}>{item.name}</Radio>
                  ))
                }
                </Space>
              </Radio.Group>  
            )
          };
        }
        case fieldData.type === FieldEnum.Textarea: {
          const windowHeight = window.innerHeight;
          const maxAvailableRows = Math.round((windowHeight - 178) / 30)
          return {
            inputComponent: <TextArea 
              autoSize={{
                minRows: maxAvailableRows,
                maxRows: maxAvailableRows
              }}
              className='custom-scroll'
            />,
          };
        }
        

        default: {
          return {
            inputComponent: <Input />,
          };
        }
      }
    },
    [],
  );

  return {
    getInputObj
  };
};

export const useEditModal = (modalProps: TaskListModalPropsType, users: User[]) => {
  
  const { 
    modalData, 
    modalItem,
    okText: okTextModal, 
    onOk: onOkModal, 
    headerText : headerTextModal } = useMemo(() => {
    const { okText, onOk, headerText, ...rest } = modalProps;
    const { title, description, state, responsibleUser, plannedExecutionTime, actualExecutionTime } = rest;
    const modalData: FieldItemType<keyof Task>[] = [
      {
        propertyKey: 'title',
        label: 'Название',
        value: title || undefined,
        type: FieldEnum.Input,
        formSection: 'main'
      },
      {
        propertyKey: 'description',
        label: 'Описание',
        value: description || undefined,
        type: FieldEnum.Textarea,
        formSection: 'main'
      },
      {
        propertyKey: 'state',
        label: 'Статус',
        value: state || undefined,
        type: FieldEnum.Select,
        catalog: TaskStateOptionArr,
        formSection: 'sidebar'
      },
      {
        propertyKey: 'responsibleUser',
        label: 'Ответственный',
        value: responsibleUser || undefined,
        type: FieldEnum.Select,
        catalog: users.map(({ _id, login }) => ({
          id: _id as string,
          name: login as string
        })),
        formSection: 'sidebar'
      },
      {
        propertyKey: 'plannedExecutionTime',
        label: 'Планируемое время выполнения',
        value: plannedExecutionTime || undefined,
        type: FieldEnum.Input,
        formSection: 'sidebar'
      },
      {
        propertyKey: 'actualExecutionTime',
        label: 'Фактическое время выполнения',
        value: actualExecutionTime || undefined,
        type: FieldEnum.Input,
        formSection: 'sidebar'
      },
    ];
    return {
      modalData,
      okText,
      headerText,
      onOk,
      modalItem: {
        ...rest,
        createdBy: users.find(user => user._id === rest.createdBy)?.login || rest.createdBy,
        modifidedBy: users.find(user => user._id === rest.modifidedBy)?.login || rest.modifidedBy,
      }
    };
  }, [modalProps]);

  return {
    modalData,
    okTextModal,
    onOkModal,
    headerTextModal,
    modalItem
  };
};
