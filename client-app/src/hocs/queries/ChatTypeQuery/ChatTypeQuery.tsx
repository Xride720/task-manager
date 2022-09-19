import React, { FC } from "react";

import { useGetChatTypesQuery } from "@graphql/queries/__generated__/chat.generated";

import { ChatTypeQueryPropsType } from "./model";

const queryName = 'getChatTypes';

const ChatTypeQuery: FC<ChatTypeQueryPropsType> = (props) => {
  const { 
    children: ChildrenComponent,
    input
  } = props;

  const { data, loading, error } = useGetChatTypesQuery({
    variables: {}
  });

  return (
    <ChildrenComponent 
      chatTypes={data ? data[queryName] || [] : []}
      chatTypesLoading={loading}
      chatTypesError={error}
    />
  );
};

export { ChatTypeQuery };