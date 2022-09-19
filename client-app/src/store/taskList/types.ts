import { Task } from "@generated/graphql";

export type TodoListStateType = {
    items: Task[];
    modalProps: TaskListModalPropsType;
}

export type TaskListModalPropsType = Partial<Task> & {
    okText?: string;
    headerText?: string;
    onOk?: (data: TaskListItemType) => void;
};

export type TaskListItemType = {
    id: string;
    title?: string;
    description?: string;
    createDate?: Date;
    itemState?: TaskStateEnum;
};

export enum TaskStateEnum {
    Created="Created",
    InWork="InWork",
    HoldOver="HoldOver",
    Completed="Completed"
}

export type NewTaskListItemType = Omit<TaskListItemType, "id">;

export type ChangeOrderItemType = {
    id: string;
    itemState: TaskStateEnum;
    index: number;
};