import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import { Request, Response } from "express";
import { IMiddleware } from "graphql-middleware";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { AuthError } from "../common/AuthError";

type AuthMiddleWareType<T = Request & { user?: any }> = (
  req: T,
  res: Response,
  next: (err?: any) => any,
) => void 

const errorAuth = (
  res: Response
) => res.status(401)
  .json({ 
    error: "auth failed", 
    message: "Пользователь не авторизован" 
  });

const authNotRequire = [ 
  "authUser",
  "createUser"
];
export const AuthContext: object | ContextFunction<ExpressContext, object> = ({ req }) => {
  const token = (req.get("Authorization") || '').split(" ")[1];
  return { user: getUser(token) };
};

export const authMiddleware: IMiddleware = async (resolve, root, args, context, info) => {
  const { path } = info;

  if (!authNotRequire.includes(path.key as string) && !authNotRequire.includes((path.prev?.key || '') as string)) {
    if (!context.user) {
      throw new AuthError('You are not authenticated!');
    }
  }

  const result = await resolve(root, args, context, info)
  return result;
};

export const getUser = (token: string) => {
  try {
    if (token && SECRET_KEY) {
      return jwt.verify(token, SECRET_KEY);
    }
    return null;
  } catch (error) {
      return null;
  }
};