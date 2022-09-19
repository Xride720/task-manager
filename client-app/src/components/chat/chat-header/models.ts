import { Chat } from "@generated/graphql";

export interface ChatHeaderProps {
  chat: Chat;
  onSelectChat: (chat: Chat | null) => void;
}

