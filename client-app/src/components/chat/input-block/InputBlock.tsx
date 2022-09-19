import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { InputBlockProps } from './models';
import cl from './InputBlock.module.scss';
import { Input, InputRef } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const InputBlock: FC<InputBlockProps> = (props) => {
  const {
    height,
    setHeight,
    sendMessage
  } = props;

  const [message, setMessage] = useState<string>();
  const areaRef = useRef<HTMLDivElement | null>(null);

  const resizeArea = useCallback(() => {
    if (areaRef.current) {
      const __height = areaRef.current.clientHeight < 52 ? 52 : areaRef.current.clientHeight;
      setHeight(__height);
    }
  }, [setHeight]);

  const handleInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    const { target } = e;
    const __height = target.clientHeight < 52 ? 52 : target.clientHeight;
    setHeight(__height);
    setMessage(target.innerText);
  };

  useEffect(() => {
    resizeArea();
  }, [resizeArea]);

  const handleSendMessage = async () => {
    const message = areaRef.current?.innerText || '';
    if (!message) return;
    await sendMessage(message);
    if (areaRef.current) areaRef.current.innerHTML = '';
    setMessage(undefined);
    resizeArea();
  };

  return (
    <div className={cl.inputBlock} style={{ height }} >
      <div
        className={cl.inputArea + ' custom-scroll'}
        contentEditable
        ref={areaRef}
        onInput={handleInput}
      />
      {!message && <div className={cl.placeholder}>Write a message...</div>}
      <div className={cl.btnArea}>
        <div className={cl.btn} onClick={handleSendMessage}>
          <SendOutlined />
        </div>
      </div>
    </div>
  );
};

export { InputBlock };