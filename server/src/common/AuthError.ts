import { ApolloError } from 'apollo-server-errors';
const AUTH_ERROR_CODE = "AUTH_ERROR";

export class AuthError extends ApolloError {
  constructor(message: string) {
    super(message, AUTH_ERROR_CODE);

    Object.defineProperty(this, 'name', { value: 'MyError' });
  }
}