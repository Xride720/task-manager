import { FetchResult } from "@apollo/client";
import { ChatInput, ChatMessageInput } from "@generated/graphql";
import {
  useDeleteChatMutation,
  useCreateChatMutation,
  useDeleteChatMessageMutation,
  useCreateChatMessageMutation
} from "@graphql/mutations/__generated__/chat.generated";


export type FetchResultEx<T> = Promise<FetchResult<T, Record<string, any>, Record<string, any>>>;
export type ChatMutationType = "add" | "delete" | "update";

export type ChatControlType = {
  deleteChat: ( id: string ) => FetchResultEx<any>
  createChat: ( _data: ChatInput ) => FetchResultEx<any>
  deleteChatMessage: ( id: string ) => FetchResultEx<any>
  createChatMessage: ( _data: ChatMessageInput ) => FetchResultEx<any>
};


export const useChatControl = (): ChatControlType => {
  const [ deleteChatRequest ] = useDeleteChatMutation();
  const [ createChatRequest ] = useCreateChatMutation();
  const [ deleteChatMessageRequest ] = useDeleteChatMessageMutation();
  const [ createChatMessageRequest ] = useCreateChatMessageMutation();

  const proxyFn = (fn: (data: any) => FetchResultEx<any>) => {
    return (_data: any ) => {
      return fn({
        variables: { input: _data }
      });
    };
  }; 
  
  return {
    deleteChat: proxyFn(deleteChatRequest),
    createChat: proxyFn(createChatRequest),
    deleteChatMessage: proxyFn(deleteChatMessageRequest),
    createChatMessage: proxyFn(createChatMessageRequest),
  };
};