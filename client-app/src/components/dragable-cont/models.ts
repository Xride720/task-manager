import { CSSProperties } from "react";

export interface DragableContProps{
  id: string;
  index: number;
  getItemStyle: (isDragging: boolean, draggableStyle: CSSProperties) => CSSProperties; 
  children?: (isDragging: boolean) => JSX.Element; 
}

