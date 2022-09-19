import { Context } from "vm";
import { Users } from "../../../db/dbConnector";
import { QueryResolvers, User } from "../../../generated/graphql";

export const userQueries: QueryResolvers = {
  getUsers: async (_, inputObject, ctx: Context) => {
    const { ids } = inputObject;
    const filterIdArr: { _id: string }[] = ids?.filter(_id => !!_id).map(_id => ({ _id: _id as string })) || [];
    const result: User[] = filterIdArr.length ? await Users.find({
      $or: filterIdArr
    }) : await Users.find();
    return result;
  },
};