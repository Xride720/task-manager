import { ApolloError } from "@apollo/client";
import { Maybe, ChatType } from "@generated/graphql";
import React from "react";

export type ChatTypeQueryPropsType = {
  children: React.FC<ChatTypeQueryChildrenPropsType>;
  input?: string[];
};

export type ChatTypeQueryChildrenPropsType = {
  chatTypes: Maybe<ChatType>[];
  chatTypesLoading: boolean;
  chatTypesError?: ApolloError;
}