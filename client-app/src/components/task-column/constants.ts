import { TaskStateEnum } from "@store/taskList/types";

export const getTaskTitle = (state?: TaskStateEnum) => {
  switch (state) {
    case TaskStateEnum.Created:
      return "Новая задача";
      break;
    case TaskStateEnum.InWork:
      return "В работе";
      break;
    case TaskStateEnum.HoldOver:
      return "Отложено";
      break;
    case TaskStateEnum.Completed:
      return "Завершено";
      break;
    default:
      return "Неопознано";
      break;
  }
};

export const getTaskColor = (state?: TaskStateEnum, opacity?: string) => {
  switch (state) {
    case TaskStateEnum.Created:
      return `rgba(0, 179, 212, ${opacity || '.3'})`; // $blue-accent
      break;
    case TaskStateEnum.InWork:
      return `rgba(230, 150, 29, ${opacity || '.3'})`; // $orange-accent
      break;
    case TaskStateEnum.HoldOver:
      return `rgba(227, 99, 99, ${opacity || '.3'})`; // $red-accent
      break;
    case TaskStateEnum.Completed:
      return `rgba(11, 201, 98, ${opacity || '.3'})`; // $green-accent
      break;
    default:
      return "#fff";
      break;
  }
};