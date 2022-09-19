import * as SchemaTypes from '../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserChatListSubscriptionVariables = SchemaTypes.Exact<{
  userId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>;
}>;


export type UserChatListSubscription = { __typename?: 'Subscription', userChatList?: Array<{ __typename?: 'Chat', _id?: string | null, title?: string | null, userIds?: Array<string | null> | null, createdBy?: string | null } | null> | null };

export type ChatMessagesSubscriptionVariables = SchemaTypes.Exact<{
  chatId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>;
}>;


export type ChatMessagesSubscription = { __typename?: 'Subscription', chatMessages?: Array<{ __typename?: 'ChatMessage', _id?: string | null, content?: string | null, createdBy?: string | null, creationDate?: string | null } | null> | null };


export const UserChatListDocument = gql`
    subscription userChatList($userId: String) {
  userChatList(userId: $userId) {
    _id
    title
    userIds
    createdBy
  }
}
    `;

/**
 * __useUserChatListSubscription__
 *
 * To run a query within a React component, call `useUserChatListSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserChatListSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserChatListSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserChatListSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UserChatListSubscription, UserChatListSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserChatListSubscription, UserChatListSubscriptionVariables>(UserChatListDocument, options);
      }
export type UserChatListSubscriptionHookResult = ReturnType<typeof useUserChatListSubscription>;
export type UserChatListSubscriptionResult = Apollo.SubscriptionResult<UserChatListSubscription>;
export const ChatMessagesDocument = gql`
    subscription chatMessages($chatId: String) {
  chatMessages(chatId: $chatId) {
    _id
    content
    createdBy
    creationDate
  }
}
    `;

/**
 * __useChatMessagesSubscription__
 *
 * To run a query within a React component, call `useChatMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatMessagesSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatMessagesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ChatMessagesSubscription, ChatMessagesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatMessagesSubscription, ChatMessagesSubscriptionVariables>(ChatMessagesDocument, options);
      }
export type ChatMessagesSubscriptionHookResult = ReturnType<typeof useChatMessagesSubscription>;
export type ChatMessagesSubscriptionResult = Apollo.SubscriptionResult<ChatMessagesSubscription>;