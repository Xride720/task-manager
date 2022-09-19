import { Chat } from "@generated/graphql";

export type ChatListSubscriptionPropsType = {
  children?: any;
  setChatList?: (chats: Chat[]) => void;
  className?: string;
};