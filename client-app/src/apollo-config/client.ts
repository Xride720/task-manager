import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split, from } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { getAuthStorageAll } from "@services/localStorage/auth";
import { createClient } from 'graphql-ws';
import { onError } from "@apollo/client/link/error";
import { AUTH_ERROR_CODE } from "./constants";
import store from "@store";
import { errorHandler } from "./errorHandler";

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const { token } = getAuthStorageAll();

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});

const errorLink = onError(errorHandler);

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5000/graphql',
  lazy: true,
  onNonLazyError: (error) => {
    console.error(error);
  },
  connectionParams: () => {
    const { token } = getAuthStorageAll();
    return {
      Authorization: `Bearer ${token}`,
    };
  },
  on: {
    error: (e: any) => {
      console.error(e);
    }
  }
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  from([errorLink, httpLink]),
);

export const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache()
});