import { ChatType, Maybe, Task } from "@generated/graphql";
import { getAuthStorageAll, setAuthStorage } from "@services/localStorage/auth";
import { parseJwt } from "@tools/string";
import { action, computed, makeObservable, observable } from "mobx";

import { AuthStateType, UserInfo } from "./types";
const { email: initialEmail, token: initialToken } = getAuthStorageAll();
export default class AuthStore {
  constructor() {
    makeObservable(this);
  }
  
  @observable state: AuthStateType = {
    email: initialEmail,
    token: initialToken,
    tokenInfo: initialToken ? parseJwt(initialToken) : undefined,
    users: [],
    chatTypes: []
  };

  @action refreshAuth = (email: string, token: string) => {
    this.state.email = email;
    this.state.token = token;
    setAuthStorage({
      token,
      email
    });
  };

  @action logout = () => {
    this.state.email = undefined;
    this.state.token = undefined;
    setAuthStorage({
      token: undefined,
      email: undefined
    });
  };

  @action setUsers = (users: Maybe<UserInfo>[]) => {
    this.state.users = users;
  };

  @action setChatTypes = (types: Maybe<ChatType>[]) => {
    this.state.chatTypes = types;
  };

  @computed get userId(): string | undefined {
    return this.state.tokenInfo?.id;
  }

  @computed get userEmail(): string | undefined {
    return this.state.tokenInfo?.email;
  }

  @computed get users(): (UserInfo | null)[] {
    return this.state.users;
  }

  @computed get chatTypes(): (ChatType | null)[] {
    return this.state.chatTypes;
  }
}