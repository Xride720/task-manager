import { TaskInput } from "@generated/graphql";

export type TaskControlPropsType = {
  children?: any;
  type: TaskMutationType;
  input?: Partial<TaskInput>;
};

export type TaskMutationType = "add" | "delete" | "update";