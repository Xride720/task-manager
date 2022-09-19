import { Task } from "@generated/graphql";
import { ModalFuncProps } from "antd";
import React, { ReactElement } from "react";
export interface EditModalProps {
  changeVisible: React.MutableRefObject<((visible: boolean) => void) | null>;
  data: FieldItemType<keyof Task>[];
  okText?: string;
  headerText?: string;
  onOk?: (data?: any) => void;
  item: Task;
}


export enum FieldEnum {
  Input = "Input",
  Textarea = "Textarea",
  Select = "Select",
  Switch = "Switch",
  Radio = "Radio"
}

export type InputPropertyType = {
  inputComponent: ReactElement;
  valuePropName?: string;
  label?: string;
  buttons?: ReactElement;
};

export type FieldItemType<T = string> = {
  propertyKey: T;
  catalog?: OptionType[];
  type?: FieldEnum;
  hidden?: boolean;
  label?: string;
  value?: string | boolean;
  catalogDirection?: "horizontal" | "vertical";
  formSection: "main" | "sidebar";
};
export type OptionType = {
  id: string;
  name: string;
};