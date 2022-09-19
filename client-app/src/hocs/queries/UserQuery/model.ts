import { ApolloError } from "@apollo/client";
import { Maybe, User, UserInput } from "@generated/graphql";
import React from "react";

export type UserQueryPropsType = {
  children: React.FC<UserQueryChildrenPropsType>;
  input?: string[];
};

export type UserQueryChildrenPropsType = {
  users: Maybe<User>[];
  usersLoading: boolean;
  usersError?: ApolloError;
}