import { Context } from "vm";
import { LATEST_TASKS, pubsub } from "..";
import { Tasks } from "../../../db/dbConnector";
import { MutationResolvers, Task } from "../../../generated/graphql";

export const taskMutations: MutationResolvers = {
  deleteTask: async (_, inputObject, ctx: Context) => {
    const result = await Tasks.deleteOne({ _id: inputObject.input });
    pubsub.publish(LATEST_TASKS, {
      userId: ctx.user.id,
      availableUserIds: [ctx.user.id]
    });
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
    pubsub.publish(LATEST_TASKS, {
      userId: ctx.user.id,
      availableUserIds: [ctx.user.id]
    });
    return _id || '';
  },
  updateTaskMany: async (_, inputObject, ctx: Context) => {
    const userIds = new Set();
    for (const task of inputObject.input || []) {
      const { _id, ...data  } = task || {};
      if (data.createdBy !== undefined && data.createdBy !== null) userIds.add(data.createdBy);
      if (data.responsibleUser !== undefined && data.responsibleUser !== null) userIds.add(data.responsibleUser);
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
    userIds.add(ctx.user.id);
    
    pubsub.publish(LATEST_TASKS, {
      userId: ctx.user.id,
      availableUserIds: Array.from(userIds)
    });
    return "updated";
  },
  createTask: async (_, inputObject, ctx: Context) => {
    const userIds = [];
    const result = await Tasks.insertMany([
      {
        ...inputObject.input,
        creationDate: new Date().toISOString(),
        createdBy: ctx.user.id
      }
    ]);
    if (inputObject.input) {
      const { createdBy, responsibleUser } = inputObject.input;
      if (createdBy !== undefined && createdBy !== null) userIds.push(createdBy);
      if (responsibleUser !== undefined && responsibleUser !== null) userIds.push(responsibleUser);
    }
    pubsub.publish(LATEST_TASKS, {
      userId: ctx.user.id,
      availableUserIds: userIds
    });
    return result[0]._id as string;
  },

};