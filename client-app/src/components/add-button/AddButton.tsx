import React, { FC } from 'react';
import { AddButtonProps } from './models';
import cl from './AddButton.module.scss';
import { PlusCircleOutlined } from '@ant-design/icons';
import { positionStyle } from './constants';

const AddButton: FC<AddButtonProps> = ({ position = "topRight", onClick }) => {
  const style = positionStyle[position];
  return (
    <button className={cl.addButton} style={style || {}} onClick={onClick}>
      <PlusCircleOutlined />
    </button>
  );
};

export { AddButton };