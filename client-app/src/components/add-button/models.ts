export interface AddButtonProps{
  position?: PositionType;
  onClick?: (data?: any) => void
}

export type PositionType = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

