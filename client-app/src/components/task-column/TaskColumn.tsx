import React, { FC } from 'react';
import { getTaskColor, getTaskTitle } from './constants';
import { TaskColumnProps } from './models';
import cl from './TaskColumn.module.scss';

const TaskColumn: FC<TaskColumnProps> = ({ children, taskState }) => {
  return (
    <div className={cl.taskColumn}>
      <p className={cl.taskColumn_header}
        style={{
          background: `linear-gradient(0deg, ${getTaskColor(taskState, ".5")} 0%, ${getTaskColor(taskState, ".05")} 100%)`,
          borderColor: getTaskColor(taskState, ".5")
        }}
      >
        {getTaskTitle(taskState)}
      </p>
      {children}
    </div>
  );
};

export { TaskColumn };