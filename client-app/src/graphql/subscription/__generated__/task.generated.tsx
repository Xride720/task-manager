import * as SchemaTypes from '../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LatestTasksSubscriptionVariables = SchemaTypes.Exact<{
  userId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>;
}>;


export type LatestTasksSubscription = { __typename?: 'Subscription', latestTasks?: Array<{ __typename?: 'Task', _id?: string | null, title?: string | null, description?: string | null, creationDate?: string | null, state?: string | null, orderIndex?: number | null, modifidedDate?: string | null, createdBy?: string | null, modifidedBy?: string | null, responsibleUser?: string | null, plannedExecutionTime?: string | null, actualExecutionTime?: string | null } | null> | null };


export const LatestTasksDocument = gql`
    subscription latestTasks($userId: String) {
  latestTasks(userId: $userId) {
    _id
    title
    description
    creationDate
    state
    orderIndex
    modifidedDate
    createdBy
    modifidedBy
    responsibleUser
    plannedExecutionTime
    actualExecutionTime
  }
}
    `;

/**
 * __useLatestTasksSubscription__
 *
 * To run a query within a React component, call `useLatestTasksSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLatestTasksSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestTasksSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLatestTasksSubscription(baseOptions?: Apollo.SubscriptionHookOptions<LatestTasksSubscription, LatestTasksSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<LatestTasksSubscription, LatestTasksSubscriptionVariables>(LatestTasksDocument, options);
      }
export type LatestTasksSubscriptionHookResult = ReturnType<typeof useLatestTasksSubscription>;
export type LatestTasksSubscriptionResult = Apollo.SubscriptionResult<LatestTasksSubscription>;