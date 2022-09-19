import { ChatMessage } from "@generated/graphql";

export interface MessageItemProps extends MessageItemType {
  align: 'right' | 'left';
}

export type MessageItemType = ChatMessage & {

};
