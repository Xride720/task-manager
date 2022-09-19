import { Task } from "@generated/graphql";

export type TaskSubscriptionPropsType = {
  children?: any;
  setTasks?: (tasks: Task[]) => void;
  className?: string;
};