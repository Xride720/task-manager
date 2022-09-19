import { ApolloError } from "@apollo/client";
import { AuthOutput, UserInput } from "@generated/graphql";
import React from "react";

export type AuthControlPropsType = {
  children: React.FC<AuthControlChildrenPropsType>;
  type: AuthMutationType;
  input?: Partial<UserInput>;
};

export type AuthControlChildrenPropsType = {
  handler: (input: UserInput) => Promise<AuthOutput>;
  loading: boolean;
  error?: ApolloError;
}

export type AuthMutationType = "registration" | "auth";