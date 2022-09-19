import { ErrorLink } from "@apollo/client/link/error";
import { message as antMessage } from 'antd';
import store from "@store";
import { AUTH_ERROR_CODE, AUTH_ERROR_MESSAGE } from "./constants";

export const errorHandler: ErrorLink.ErrorHandler = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, path, extensions }) => {
      if (extensions.code === AUTH_ERROR_CODE) {
        store.AuthStore.logout();
        antMessage.error(AUTH_ERROR_MESSAGE, 1);
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Path: ${path}`
      )
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
};