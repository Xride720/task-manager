import { ChatMessage } from "@generated/graphql";

export type ChatMessagesSubscriptionPropsType = {
  children?: any;
  setChatMessages?: (messageArr: ChatMessage[]) => void;
  className?: string;
  chatId: string | null;
};