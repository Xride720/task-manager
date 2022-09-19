import { TaskStateEnum } from "@store/taskList/types";

export interface TaskColumnProps{
  taskState?: TaskStateEnum;
  children?: JSX.Element;
}

