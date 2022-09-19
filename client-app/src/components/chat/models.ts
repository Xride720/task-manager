import { Chat } from "@generated/graphql";


export interface ChatProps {
  chat: Chat;
  onSelectChat: (chat: Chat | null) => void;
}

