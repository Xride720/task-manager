import { Chat } from "@generated/graphql";

export interface ChatNavItemProps {
  selected?: boolean;
  onSelect: (chat: Chat) => void;
  chat: Chat
}


export type ChatType = 'single' | 'multi';
