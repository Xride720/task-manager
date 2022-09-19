import { ChatInput } from "@generated/graphql";

export interface CreateChatModalProps {
  changeVisible: React.MutableRefObject<((visible: boolean) => void) | null>;
  okText: string;
  onOk: (data: ChatInput) => void;
  headerText: string;
}

