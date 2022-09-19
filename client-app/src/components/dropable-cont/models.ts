import { CSSProperties } from "react";

export interface DropableContProps{
  id: string;
  getListStyle: (isDragging: boolean) => CSSProperties; 
  children?: JSX.Element; 
}

