import React, { FC } from 'react';
import { ChatNavItemProps } from './models';
import cl from './ChatNavItem.module.scss';

const ChatNavItem: FC<ChatNavItemProps> = (props) => {
  const {
    chat,
    selected,
    onSelect
  } = props;
  const {
    title,
    typeId,
  } = chat;
  const handleSelect = () => {
    onSelect(chat);
  };
  return (
    <div className={cl.chatNavItem + ' ' + (selected ? cl.selected : '')} onClick={handleSelect}>
      <div className={cl.chatNavItem__logo}>{title?.slice(0,2).toLocaleUpperCase() || ''}</div>
      <div className={cl.chatNavItem__content}>
        <div className={cl.chatNavItem__content_title}>
          {title}
        </div>
        <div className={cl.chatNavItem__content_lastMessage}>
          {typeId} !!! fix this
        </div>
      </div>
    </div>
  );
};

export { ChatNavItem };