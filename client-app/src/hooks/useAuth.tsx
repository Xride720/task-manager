import { getAuthStorageAll } from "@services/localStorage/auth";
import store from "@store";
import { observer } from "mobx-react";
import { useState } from "react";

type AuthHookReturnValue = {
  isAuth: boolean;
};
export const useAuth = (): AuthHookReturnValue => {
  const { token } = store.AuthStore.state;

  return {
    isAuth: !!token,
  };
};