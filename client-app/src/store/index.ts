import AuthStore from "./auth";
import TaskListStore from "./taskList";

export class MainStore {
    TaskListStore: TaskListStore;
    AuthStore: AuthStore;
    constructor () {
        this.TaskListStore = new TaskListStore();
        this.AuthStore = new AuthStore();
    }
    
}

export default new MainStore();



