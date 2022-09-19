import { Context } from "vm";
import { ChatTypes } from "../../../db/dbConnector";
import { QueryResolvers, ChatType } from "../../../generated/graphql";

export const chatQueries: QueryResolvers = {
  getChatTypes: async (_, inputObject, ctx: Context) => {
    const result: ChatType[] = await ChatTypes.find();
    return result;
  },
};