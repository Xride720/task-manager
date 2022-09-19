import React, { FC, useMemo, useEffect, useState, useCallback } from 'react';
import { MessageItemProps } from './models';
import cl from './MessageItem.module.scss';
import { chatDateConverter, getUpdatePeriod, PeriodUpdateEnum } from '@tools/date';
import { Dropdown } from 'antd';
import { messageDropdownMenu } from './constants';
import { useChatControl } from '@hooks/useChatControl';

const MessageItem: FC<MessageItemProps> = (props) => {
  const {
    content,
    align,
    creationDate,
    _id
  } = props;
  const [tick, setTick] = useState<number>(0);
  const { deleteChatMessage } = useChatControl();
  const dateText = useMemo(() => {
    if (!creationDate) return;
    const date = new Date(creationDate);
    return chatDateConverter(date);
  }, [creationDate, tick]);
  
  useEffect(() => {
    if (!creationDate) return;
    const updatePeriod = getUpdatePeriod(new Date(creationDate));
    const timer = updatePeriod !== PeriodUpdateEnum.NoUpdate ? setInterval(() => {
      setTick(prev => prev + 1);
    }, updatePeriod === PeriodUpdateEnum.Second ? 10_000 : 60_000) : undefined;
    return () => {
      timer && clearInterval(timer);
    };
  }, []);

  const handleDeleteMessage = useCallback(async () => {
    if (!_id) return;
    await deleteChatMessage(_id);
  }, [_id]);

  return (
    <Dropdown
      overlay={messageDropdownMenu(
        handleDeleteMessage
      )}
      trigger={['contextMenu']}
    >
      <div className={cl.messageItem + ' ' + (align === 'left' ? cl.messageItem__left : cl.messageItem__right)}>
        <div className={cl.messageItem__body}>
          <p className={cl.messageItem__body_text}>
            {content}
          </p>
          <p className={cl.messageItem__body_date}>{dateText}</p>
        </div>
      </div>
    </Dropdown>
  );
};

export { MessageItem };