import { withFilter } from "graphql-subscriptions";
import { LATEST_TASKS, pubsub } from "..";
import { Tasks } from "../../../db/dbConnector";
import { SubscriptionResolvers, Task } from "../../../generated/graphql";

export const taskSubscriptions: SubscriptionResolvers = {
  latestTasks: {
    // @ts-ignore
    subscribe: withFilter((_, args) => {
      setTimeout(() => pubsub.publish(LATEST_TASKS, { userId: args.userId }));
      return pubsub.asyncIterator([ LATEST_TASKS ]);
    }, (payload, variables) => payload.userId === variables.userId),
    resolve: async function (payload: any) {
      /** доступ к задаче имеет только создатель и ответственный */
      const result: Task[] = await Tasks.find({
        $or: [
          {
            createdBy: payload.userId
          },
          {
            responsibleUser: payload.userId
          }
        ]
      });
      return result;
    },
  } 
};