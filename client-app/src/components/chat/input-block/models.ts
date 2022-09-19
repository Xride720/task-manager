import React from 'react';

export interface InputBlockProps{
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  sendMessage: (message: string) => void;
}

