import React, { CSSProperties, FC } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import moment from 'moment';

import { getTaskColor } from '@components/task-column/constants';
import { TaskListItemProps } from './models';

import cl from './TaskListItem.module.scss';
import { TaskStateEnum } from '@store/taskList/types';

const TaskListItem: FC<TaskListItemProps> = (props) => {
  const { 
    _id : id, 
    title, 
    description, 
    state: itemState,
    creationDate, 
    modifidedDate,
    deleteItem, 
    changeItem,
    isDragging 
  } = props;

  const style: CSSProperties = {
    background: getTaskColor(itemState as TaskStateEnum, isDragging ? ".5" : ".1"),
    borderColor: getTaskColor(itemState as TaskStateEnum, isDragging ? "1" : ".5")
  };

  return (
    <div className={cl.taskListItem}  style={style}>
      
      <div className={cl.taskListItem_buttonBlock}>
        <div className={cl.taskListItem_buttonBlock_editBtn} onClick={() => changeItem( id! )}>
          <EditOutlined />
        </div>
        <div className={cl.taskListItem_buttonBlock_deleteBtn} onClick={() => deleteItem( id! )}>
          <DeleteOutlined />
        </div>
      </div>
      <p className={cl.taskListItem_title}>{title}</p>
      <p className={cl.taskListItem_description}>{description}</p>

    </div>
  );
};

export { TaskListItem };