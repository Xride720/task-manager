import { ObjectId } from "mongodb";
import { Context } from "vm";
import { CHAT_EVENT, CHAT_MESSAGE_EVENT, pubsub } from "..";
import { ChatMessages, Chats } from "../../../db/dbConnector";
import { MutationResolvers } from "../../../generated/graphql";

export const chatMutations: MutationResolvers = {
  deleteChat: async (_, inputObject, ctx: Context) => {
    const userId = ctx.user.id;
    const result = await Chats.deleteOne({ _id: inputObject.input });
    const resultMessages = await ChatMessages.deleteMany({ chatId: inputObject.input });
    pubsub.publish(CHAT_EVENT, { userId });
    return result.deletedCount;
  },
  createChat: async (_, inputObject, ctx: Context) => {
    if (!inputObject.input) return 0;
    const data = inputObject.input;
    const userId = ctx.user.id;
    const newChat = new Chats({
      ...data,
      userIds: [ ...(data.userIds || []).filter(id => id !== userId), userId ],
      createdBy: userId
    });
    const result = await newChat.save();
    pubsub.publish(CHAT_EVENT, { userId });
    return 1;
  },
  createChatMessage: async (_, inputObject, ctx: Context) => {
    if (!inputObject.input) return 0;
    const data = inputObject.input;
    const chatId = data.chatId;
    const result = await ChatMessages.insertMany([
      {
        ...data,
        creationDate: new Date().toISOString(),
        createdBy: ctx.user.id
      }
    ]);
    pubsub.publish(CHAT_MESSAGE_EVENT, { chatId });
    return result.length;
  },
  deleteChatMessage: async (_, inputObject, ctx: Context) => {
    const message = await ChatMessages.find({ _id: inputObject.input });
    //@ts-ignore
    const chatId = message[0].chatId?.toString();
    const result = await ChatMessages.deleteOne({ _id: inputObject.input });
    chatId && pubsub.publish(CHAT_MESSAGE_EVENT, { chatId });
    return result.deletedCount;
  },

};