import React, { FC, useMemo, useRef, useState } from 'react';
import { ChatNavListProps } from './models';
import cl from './ChatNavList.module.scss';
import { ChatNavItem } from './chat-nav-item';
import { Button, Input } from 'antd';
import { ChatListSubscription } from '@hocs/subscriptions/ChatListSubscription';
import { Chat, ChatInput } from '@generated/graphql';
import { PlusCircleOutlined } from '@ant-design/icons';
import { CreateChatModal } from '@components/create-chat-modal';
import { useChatControl } from '@hooks/useChatControl';

const ChatNavList: FC<ChatNavListProps> = (props) => {
  const {
    onSelectChat,
    selectedChat
  } = props;
  const { createChat } = useChatControl();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [chatList, setChatList] = useState<Chat[]>([]);

  const changeVisibleModalRef = useRef<((visible: boolean) => void) | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const chatItems = useMemo(() => {
    return searchValue ?
      chatList.filter(
        item => item?.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      )
      : chatList;
  }, [searchValue, chatList]);

  const handleOpenCreateChatModal = () => {
    changeVisibleModalRef.current && changeVisibleModalRef.current(true);
  };

  const handleCreateChat = async (data: ChatInput) => {
    await createChat(data);
    changeVisibleModalRef.current && changeVisibleModalRef.current(false);
  };

  return (
    <div className={cl.chatNavList}>
      <div className={cl.searchBlock}>
        <Input
          onChange={handleSearch}
          allowClear
          className={cl.searchInput}
          placeholder='Поиск'
        />
      </div>
      <ChatListSubscription
        setChatList={setChatList}
      >
        <div className={cl.list + ' custom-scroll'}>
          {
            chatItems.map((item, i) => (
              <ChatNavItem
                key={i}
                selected={item._id === selectedChat?._id}
                onSelect={onSelectChat}
                chat={item}
              />
            ))
          }
        </div>
      </ChatListSubscription>
      <div className={cl.createBlock} onClick={handleOpenCreateChatModal}>
        <button className={cl.createButton}>
          <PlusCircleOutlined />
        </button>
      </div>

      <CreateChatModal
        changeVisible={changeVisibleModalRef}
        okText={'Save'}
        onOk={handleCreateChat}
        headerText={'Creating chat'}      
      />
    </div>
  );
};

export { ChatNavList };