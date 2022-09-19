import { Context } from "vm";
import { Tasks } from "../../../db/dbConnector";
import { QueryResolvers, Task } from "../../../generated/graphql";

export const taskQueries: QueryResolvers = {
  getAllTasks: async (_, inputObject, ctx: Context) => {
    const result: Task[] = await Tasks.find();
    return result;
  },
};