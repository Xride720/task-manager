import React, { CSSProperties } from "react";

import { Property } from "csstype";
import { TaskStateEnum } from "@store/taskList/types";
import { getTaskColor } from "@components/task-column/constants";

const grid = 8;

export const getItemStyle = (isDragging: boolean, draggableStyle: CSSProperties) => ({
  width: "100%",
  // styles we need to apply on draggables
  ...draggableStyle
});

export const getListStyle = (isDraggingOver: boolean, state: TaskStateEnum) => ({
  background: isDraggingOver ? getTaskColor(state, ".1") : undefined,
  transition: "background-color .2s ease",
  width: "100%",
  // padding: grid,
  // width: 250
});

export const TaskStateArr = [
  TaskStateEnum.Created,
  TaskStateEnum.InWork,
  TaskStateEnum.HoldOver,
  TaskStateEnum.Completed
];

export const TaskStateOptionArr = [
  {
    id: TaskStateEnum.Created,
    name: "Новая задача"
  },
  {
    id: TaskStateEnum.InWork,
    name: "В работе"
  },
  {
    id: TaskStateEnum.HoldOver,
    name: "Отложено"
  },
  {
    id: TaskStateEnum.Completed,
    name: "Завершено"
  },
];