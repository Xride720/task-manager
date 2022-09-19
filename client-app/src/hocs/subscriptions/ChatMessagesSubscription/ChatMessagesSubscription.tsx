import React, { FC, useEffect } from "react";

import { ChatMessage } from "@generated/graphql";
import { useChatMessagesSubscription } from "@graphql/subscription/__generated__/chat.generated";

import { ChatMessagesSubscriptionPropsType } from "./model";

const ChatMessagesSubscription: FC<ChatMessagesSubscriptionPropsType> = (props) => {
  const { 
    children,
    setChatMessages,
    className: __className,
    chatId
  } = props;

  const { data, loading } = useChatMessagesSubscription({
    variables: {
      chatId
    },
  });

  useEffect(() => {
    const messageArr = data?.chatMessages?.filter(item => !!item) as ChatMessage[] || [];
    setChatMessages && setChatMessages(messageArr);
  }, [data]);

  return (
    <>{children}</>
  );
};

export { ChatMessagesSubscription };