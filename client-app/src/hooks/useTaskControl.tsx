import { FetchResult } from "@apollo/client";
import { Task, TaskInput } from "@generated/graphql";
import { useDeleteTaskMutation, useUpdateTaskManyMutation, useCreateTaskMutation } from "@graphql/mutations/__generated__/task.generated";
import { sortTask } from "@pages/task-list-page/helpers";

export type FetchResultEx<T> = Promise<FetchResult<T, Record<string, any>, Record<string, any>>>;
export type TaskMutationType = "add" | "delete" | "update";

export type TaskControlType = {
  deleteTask: ( id: string ) => FetchResultEx<any>
  updateTaskMany: ( _data: TaskInput[] ) => FetchResultEx<any>
  createTask: ( _data: TaskInput ) => FetchResultEx<any>
};


export const useTaskControl = ( 
  items: Task[], 
  setItems: React.Dispatch<React.SetStateAction<Task[]>> 
): TaskControlType => {
  const [ deleteTaskRequest ] = useDeleteTaskMutation();
  const [ updateTaskManyRequest ] = useUpdateTaskManyMutation();
  const [ createTaskRequest ] = useCreateTaskMutation();

  const proxyFn = (fn: (data: any) => FetchResultEx<any>, type: TaskMutationType) => {
    return (_data: any ) => {
      switch (type) {
        case "add": {
          setItems(sortTask([ ...items, _data ]));
        }break;
        case "delete": {
          setItems(items.filter(item => item._id !== _data));
        }break;
        case "update": {
          const newArr: Task[] = _data;
          setItems(newArr.reduce((acc, curr) => {
            const task = acc.find(el => el._id === curr._id);
            if (task) return [
                ...acc.filter(el => el._id !== curr._id),
                {
                  ...task,
                  ...curr
                }
              ];
            else
            return acc;
          }, items))
        }break;
      
        default: break;
      }
      return fn({
        variables: { input: _data }
      });
    };
  }; 
  
  return {
    deleteTask: proxyFn(deleteTaskRequest, "delete"),
    updateTaskMany: proxyFn(updateTaskManyRequest, "update"),
    createTask: proxyFn(createTaskRequest, "add")
  };
};