import React, { FC, useEffect } from "react";

import { ChatListSubscriptionPropsType } from "./model";
import { Chat } from "@generated/graphql";
import { useUserChatListSubscription } from "@graphql/subscription/__generated__/chat.generated";
import { observer } from "mobx-react";
import store from "@store";

const ChatListSubscription: FC<ChatListSubscriptionPropsType> = observer((props) => {
  const { 
    children,
    setChatList,
    className: __className
  } = props;

  const { userId } = store.AuthStore;

  const { data, loading } = useUserChatListSubscription({
    variables: {
      userId
    },
  });

  useEffect(() => {
    const chatArr = data?.userChatList?.filter(item => !!item) as Chat[] || [];
    setChatList && setChatList(chatArr);
  }, [data]);

  return (
    <div className={__className}>{children}</div>
  );
});

export { ChatListSubscription };