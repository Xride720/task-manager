import { withFilter } from "graphql-subscriptions";
import { CHAT_EVENT, CHAT_MESSAGE_EVENT, pubsub } from "..";
import { ChatMessages, Chats } from "../../../db/dbConnector";
import { Chat, ChatMessage, SubscriptionResolvers, Task } from "../../../generated/graphql";

export const chatSubscriptions: SubscriptionResolvers = {
  userChatList: {
    // @ts-ignore
    subscribe: withFilter((_, args: any) => {
      setTimeout(() => pubsub.publish(CHAT_EVENT, { userId: args.userId }));
      return pubsub.asyncIterator([ CHAT_EVENT ]);
    }, (payload, variables) => payload.userId === variables.userId),
    resolve: async function (payload : any) {
      const result: Chat[] = await Chats.find({
        userIds: { $all: [ payload.userId ] }
      });
      return result;
    },
  },
  chatMessages: {
    // @ts-ignore
    subscribe: withFilter((_, args: any) => {
      setTimeout(() => pubsub.publish(CHAT_MESSAGE_EVENT, { chatId: args.chatId }));
      return pubsub.asyncIterator([ CHAT_MESSAGE_EVENT ]);
    }, (payload, variables) => {
      return payload.chatId === variables.chatId
    }),
    resolve: async function (payload: any) {
      const result: ChatMessage[] = await ChatMessages.find({
        chatId: payload.chatId
      });
      return result;
    },
  },

};