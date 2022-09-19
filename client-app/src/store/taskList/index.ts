import { Task } from "@generated/graphql";
import { action, makeObservable, observable } from "mobx";
import { mocTodoListItems } from "./constants";
import { TaskListModalPropsType, TodoListStateType } from "./types";

export default class TodoListStore {
    constructor() {
        makeObservable(this);
    }
    
    @observable state: TodoListStateType = {
        items: mocTodoListItems,
        modalProps: {}
    };

    @action setModalProps = (props: TaskListModalPropsType) => {
        this.state.modalProps = props;
    }
}