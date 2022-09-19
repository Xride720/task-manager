import React, { FC } from 'react';
import { Dropdown } from 'antd';
import confirm from 'antd/lib/modal/confirm';

import { MoreOutlined } from '@ant-design/icons';
import { useChatControl } from '@hooks/useChatControl';

import { ChatHeaderProps } from './models';
import cl from './ChatHeader.module.scss';
import { chatDropdownMenu } from './constants';


const ChatHeader: FC<ChatHeaderProps> = ({ chat, onSelectChat }) => {
  const { deleteChat } = useChatControl();
  const handleDeleteChat = async() => {
    if (!chat || !chat._id) return;
    confirm({
      content: 'Delete chat?',
      okText: 'Delete',
      onOk: async () => {
        if (!chat || !chat._id) return;
        await deleteChat(chat._id);
        onSelectChat(null);
      }
    });
    
  };
  return (
    <div className={cl.chatHeader}>
      <div className={cl.chatHeader__title}>{chat.title}</div>
      <div className={cl.chatHeader__btnBlock}>
        <Dropdown
          overlay={chatDropdownMenu(
            handleDeleteChat
          )}
          placement="bottomLeft"
        >
          <div className={cl.moreBtn}>
            <MoreOutlined />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export { ChatHeader };