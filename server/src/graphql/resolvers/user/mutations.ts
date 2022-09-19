import { MutationResolvers, User } from "../../../generated/graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Context } from "vm";
import { SECRET_KEY } from "../../../config";
import { Roles, Users } from "../../../db/dbConnector";

const generateAccessToken = (user: User) => {
  const payload = {
    id: user._id,
    email: user.email,
    roles: user.role,
    login: user.login
  };
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "24h"
  });
};

export const userMutations: MutationResolvers = {
  authUser: async (_, inputObject, ctx: Context) => {
    const { login, password } = inputObject.input || {};
    if (!login || !password) return { success: false };

    const user = await Users.findOne({
      login
    });
    if (!user) return { success: false };
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return { success: false };
    const token = generateAccessToken({ ...user, _id: user._id.toString() });
    return { success: true, token };
  },

  createUser: async (_, inputObject, ctx: Context) => {
    const { login, email, password } = inputObject.input || {};
    if (!email || !password || !login) return { success: false };

    const duplicate = await Users.findOne({
      $or: [
        { email },
        { login }
      ]
    });

    if (duplicate) return { success: false };
    const hashPassword = bcrypt.hashSync(password, 7);
    const result = await Users.insertMany([{
      login,
      email,
      password: hashPassword,
      // roles: [new Roles("USER")]
    }]);
    return { success: true };
  },
};