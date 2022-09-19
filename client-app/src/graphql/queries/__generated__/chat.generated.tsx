import * as SchemaTypes from '../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetChatTypesQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type GetChatTypesQuery = { __typename?: 'Query', getChatTypes?: Array<{ __typename?: 'ChatType', _id?: string | null, value?: SchemaTypes.ChatTypeEnum | null } | null> | null };


export const GetChatTypesDocument = gql`
    query getChatTypes {
  getChatTypes {
    _id
    value
  }
}
    `;

/**
 * __useGetChatTypesQuery__
 *
 * To run a query within a React component, call `useGetChatTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetChatTypesQuery, GetChatTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatTypesQuery, GetChatTypesQueryVariables>(GetChatTypesDocument, options);
      }
export function useGetChatTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatTypesQuery, GetChatTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatTypesQuery, GetChatTypesQueryVariables>(GetChatTypesDocument, options);
        }
export type GetChatTypesQueryHookResult = ReturnType<typeof useGetChatTypesQuery>;
export type GetChatTypesLazyQueryHookResult = ReturnType<typeof useGetChatTypesLazyQuery>;
export type GetChatTypesQueryResult = Apollo.QueryResult<GetChatTypesQuery, GetChatTypesQueryVariables>;