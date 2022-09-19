import React, { FC, useEffect, useState } from 'react';
import { ChatPageProps } from './models';
import cl from './ChatPage.module.scss';
import { ChatNavList } from '@components/chat-nav-list';
import { Chat as ChatComponent } from '@components/chat';
import { Chat as ChatType } from '@generated/graphql';
import { UserQueryChildrenPropsType } from '@hocs/queries/UserQuery';
import { observer } from 'mobx-react';
import store from '@store';
import { ChatTypeQueryChildrenPropsType } from '@hocs/queries/ChatTypeQuery';
import { useGetChatTypesQuery } from '@graphql/queries/__generated__/chat.generated';

const { setUsers, setChatTypes } = store.AuthStore;

const ChatPage: FC<ChatPageProps & UserQueryChildrenPropsType> = observer(({
  users,
  usersLoading,
  usersError
}) => {
  
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
  const { data: chatTypesResponse, loading: chatTypesLoading, error: chatTypesError } = useGetChatTypesQuery();
  const handleSelectChat = (chat: ChatType | null) => {
    setSelectedChat(chat);
  };

  useEffect(() => {
    setUsers(users)
  }, [users]);

  useEffect(() => {
    if (chatTypesResponse) {
      const types = chatTypesResponse.getChatTypes;
      types && setChatTypes(types);
    }
  }, [chatTypesResponse]);

  return (
    <div className={cl.chatPageCont}>
      <ChatNavList
        selectedChat={selectedChat}
        onSelectChat={handleSelectChat}
      />
      {selectedChat && (
        <ChatComponent
          chat={selectedChat}
          onSelectChat={handleSelectChat}
        />
      )}
    </div>
  );
});

export { ChatPage };