import { Context } from "vm";
import { Tasks } from "../../../db/dbConnector";
import { QueryResolvers, Task } from "../../../generated/graphql";

export const taskQueries: QueryResolvers = {
  getAllTasks: async (_, inputObject, ctx: Context) => {
    const userId = ctx.user.id;
    /** доступ к задаче имеет только создатель и ответственный */
    const result: Task[] = await Tasks.find({
      $or: [
        {
          createdBy: userId
        },
        {
          responsibleUser: userId
        }
      ]
    });
    return result;
  },
};