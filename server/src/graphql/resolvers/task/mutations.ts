import { Context } from "vm";
import { LATEST_TASKS, pubsub } from "..";
import { Tasks } from "../../../db/dbConnector";
import { MutationResolvers, Task } from "../../../generated/graphql";

export const taskMutations: MutationResolvers = {
  deleteTask: async (_, inputObject, ctx: Context) => {
    const result = await Tasks.deleteOne({ _id: inputObject.input });
    pubsub.publish(LATEST_TASKS, {});
    return result.deletedCount;
  },
  updateTask: async (_, inputObject, ctx: Context) => {
    if (!inputObject.input) return '';
    const { _id, ...data } = inputObject.input;
    const result = await Tasks.updateOne(
      { _id },
      {
        $set: {
          ...data,
          modifidedDate: new Date().toISOString(),
          modifidedBy: ctx.user.id
        }
      }
    );
    pubsub.publish(LATEST_TASKS, {});
    return _id || '';
  },
  updateTaskMany: async (_, inputObject, ctx: Context) => {
    for (const task of inputObject.input || []) {
      const { _id, ...data  } = task || {};

      const result = await Tasks.updateOne(
        { _id },
        {
          $set: {
            ...data,
            modifidedBy: ctx.user.id, 
            modifidedDate: new Date().toISOString()
          }
        }
      );
    }
    
    pubsub.publish(LATEST_TASKS, {});
    return "updated";
  },
  createTask: async (_, inputObject, ctx: Context) => {
    const result = await Tasks.insertMany([
      {
        ...inputObject.input,
        creationDate: new Date().toISOString(),
        createdBy: ctx.user.id
      }
    ]);
    pubsub.publish(LATEST_TASKS, {});
    return result[0]._id as string;
  },

};