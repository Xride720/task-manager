import React, { FC, useState } from 'react';
import { ChatProps } from './models';
import cl from './Chat.module.scss';
import { MessageList } from './message-list';
import { InputBlock } from './input-block';
import { ChatHeader } from './chat-header';
import { useChatControl } from '@hooks/useChatControl';
import { ChatMessagesSubscription } from '@hocs/subscriptions/ChatMessagesSubscription';
import { ChatMessage } from '@generated/graphql';

const Chat: FC<ChatProps> = (props) => {
  const {
    chat,
    onSelectChat
  } = props;
  const [inputAreaHeight, setInputAreaHeight] = useState<number>(150);
  const [messageArr, setMessageArr] = useState<ChatMessage[]>([]);
  const { createChatMessage, deleteChatMessage } = useChatControl();

  const sendMessage = async (message: string) => {
    await createChatMessage({
      content: message,
      chatId: chat._id
    });
  };

  const handleDeleteMessage = async (id: string) => {
    await deleteChatMessage(id);
  };

  return (
    <div className={cl.chat}>
      <ChatHeader chat={chat} onSelectChat={onSelectChat}/>
      <ChatMessagesSubscription
        setChatMessages={setMessageArr}
        chatId={chat._id || null}
      >
        <MessageList
          messages={messageArr}
          maxHeight={`calc(100vh - ${inputAreaHeight}px)`}
        />
      </ChatMessagesSubscription>
      <InputBlock
        height={inputAreaHeight}
        setHeight={setInputAreaHeight}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export { Chat };