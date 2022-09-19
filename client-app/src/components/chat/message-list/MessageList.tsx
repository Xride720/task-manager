import React, { FC, useEffect, useRef } from 'react';
import { MessageListProps } from './models';
import cl from './MessageList.module.scss';
import { MessageItem } from './message-item';
import store from '@store';
import { observer } from 'mobx-react';

const MessageList: FC<MessageListProps> = observer((props) => {
  const { userId } = store.AuthStore;
  const {
    messages,
    maxHeight
  } = props;

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current && listRef.current.scrollTo({
      top: listRef.current.scrollHeight
    });
  }, [messages]);

  return (
    <div className={cl.messageList} style={{ maxHeight }}>
      <div className={cl.list + ' custom-scroll'} ref={listRef}>
        {messages.map(message => (
          <MessageItem
            {...message}
            key={message._id}
            align={userId === message.createdBy ? 'right' : 'left'}
          />
        ))}
      </div>
    </div>
  );
});

export { MessageList };