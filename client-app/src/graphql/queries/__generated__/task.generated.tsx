import * as SchemaTypes from '../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllTasksQueryVariables = SchemaTypes.Exact<{
  userId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>;
}>;


export type GetAllTasksQuery = { __typename?: 'Query', getAllTasks?: Array<{ __typename?: 'Task', _id?: string | null, title?: string | null, description?: string | null, creationDate?: string | null, state?: string | null, modifidedDate?: string | null, orderIndex?: number | null } | null> | null };


export const GetAllTasksDocument = gql`
    query getAllTasks($userId: String) {
  getAllTasks(userId: $userId) {
    _id
    title
    description
    creationDate
    state
    modifidedDate
    orderIndex
  }
}
    `;

/**
 * __useGetAllTasksQuery__
 *
 * To run a query within a React component, call `useGetAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTasksQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(GetAllTasksDocument, options);
      }
export function useGetAllTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(GetAllTasksDocument, options);
        }
export type GetAllTasksQueryHookResult = ReturnType<typeof useGetAllTasksQuery>;
export type GetAllTasksLazyQueryHookResult = ReturnType<typeof useGetAllTasksLazyQuery>;
export type GetAllTasksQueryResult = Apollo.QueryResult<GetAllTasksQuery, GetAllTasksQueryVariables>;