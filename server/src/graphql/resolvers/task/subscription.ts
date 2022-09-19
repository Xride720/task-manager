import { LATEST_TASKS, pubsub } from "..";
import { Tasks } from "../../../db/dbConnector";
import { SubscriptionResolvers, Task } from "../../../generated/graphql";

export const taskSubscriptions: SubscriptionResolvers = {
  latestTasks: {
    // @ts-ignore
    subscribe: (_, args) => {
      setTimeout(() => pubsub.publish(LATEST_TASKS, {}));
      return pubsub.asyncIterator([ LATEST_TASKS ]);
    },
    resolve: async function () {
      const result: Task[] = await Tasks.find();
      return result;
    },
  } 
};