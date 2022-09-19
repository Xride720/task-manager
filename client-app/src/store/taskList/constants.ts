import { TaskStateEnum, TaskListItemType } from "./types";

export const mocTodoListItems: TaskListItemType[] = [
    {
        id: "1",
        title: "First deal",
        description: "Very important deal for me",
        createDate: new Date(),
        itemState: TaskStateEnum.Created
    },
    {
        id: "2",
        title: "Second deal",
        description: "Very important deal for me",
        createDate: new Date(),
        itemState: TaskStateEnum.Created
    },
    {
        id: "3",
        title: "Third deal",
        description: "Very important deal for me",
        createDate: new Date(),
        itemState: TaskStateEnum.HoldOver
    },
    {
        id: "4",
        title: "Fourth deal",
        description: "Very important deal for me",
        createDate: new Date(),
        itemState: TaskStateEnum.InWork
    },
    {
        id: "5",
        title: "Five deal",
        description: "Very important deal for me",
        createDate: new Date(),
        itemState: TaskStateEnum.InWork
    },
    {
        id: "6",
        title: "Six deal",
        description: "Very important deal for me",
        createDate: new Date(),
        itemState: TaskStateEnum.Completed
    },
    {
        id: "7",
        title: "Seven deal",
        description: "Very important deal for me",
        createDate: new Date(),
        itemState: TaskStateEnum.Completed
    },
];