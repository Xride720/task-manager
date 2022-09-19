import { Chat } from "@generated/graphql";

export interface ChatNavListProps{
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat | null) => void;
}

