import { Task } from "@generated/graphql";
import { CSSProperties } from "react";

export type TaskListItemProps = Task & {
  deleteItem: (id: string ) => void;
  changeItem: (id: string) => void;
  isDragging: boolean;
}

