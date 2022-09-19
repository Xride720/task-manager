import React, { FC, memo } from 'react';
import { TaskListProps } from './models';
import cl from './TaskList.module.scss';

const TaskList = <T,>(props: TaskListProps<T>) => {
  const { items, renderItem, customScroll } = props;
  return (
    <div className={cl.taskList + (customScroll ? " custom-scroll" : "")}>
      {
        items?.map(renderItem)
      }
    </div>
  );
};

export { TaskList };