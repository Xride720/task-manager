import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split, from } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { getAuthStorageAll } from "@services/localStorage/auth";
import { createClient } from 'graphql-ws';
import { onError } from "@apollo/client/link/error";
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

const protocolHttp = import.meta.env.NODE_ENV === 'production' ? 'https' : 'http';
const protocolWs = import.meta.env.NODE_ENV === 'production' ? 'wss' : 'ws';

const httpLink = new HttpLink({
  uri: `${protocolHttp}://${window.location.hostname}:5000/graphql`
});

const wsLink = new GraphQLWsLink(createClient({
  url: `${protocolWs}://${window.location.hostname}:5000/graphql`,
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