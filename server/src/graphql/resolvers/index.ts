import { PubSub } from 'graphql-subscriptions';
import { Resolvers } from "../../generated/graphql";
import { userMutations } from "./user/mutations";
import { taskSubscriptions } from "./task/subscription";
import { taskQueries } from "./task/queries";
import { taskMutations } from "./task/mutations";
import { userQueries } from './user/queries';
import { chatMutations } from './chat/mutations';
import { chatSubscriptions } from './chat/subscription';
import { chatQueries } from './chat/queries';

// !! Почему не стоит использовать PubSub? на что можно заменить
export const pubsub = new PubSub();
export const LATEST_TASKS = "latestTasks";
export const CHAT_MESSAGE_EVENT = "chatMessageEvent";
export const CHAT_EVENT = "chatEvent";


export const rootResolvers: Resolvers = {
  Query: {
    ...taskQueries,
    ...userQueries,
    ...chatQueries
  },
  Mutation: {
    ...taskMutations,
    ...userMutations,
    ...chatMutations
  },
  Subscription: {
    ...taskSubscriptions,
    ...chatSubscriptions
  }  
};