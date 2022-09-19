import { ChatMessage } from "@generated/graphql";

export interface MessageListProps{
  messages: ChatMessage[];
  maxHeight: string;
}

