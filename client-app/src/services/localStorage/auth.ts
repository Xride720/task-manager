import { IsJsonString } from "@tools/string";

export type AuthStorageKey = "email" | "token";
export enum AuthStorageKeyEnum {
  Email = "email",
  Token = "token"
};
export type AuthStorageType = Record<AuthStorageKeyEnum, string>;

const emptyAuthStorage: AuthStorageType = {
  email: "",
  token: ""
};
const AUTH_STORAGE_KEY = "auth";


export const getAuthStorageAll = (): AuthStorageType => {
  const strData = localStorage.getItem(AUTH_STORAGE_KEY) || "";
  return IsJsonString(strData) ? JSON.parse(strData) : emptyAuthStorage;
};

export const setAuthStorage = (data: Partial<AuthStorageType>) => {
  const oldData = getAuthStorageAll();
  const result = {
    ...oldData,
    ...data
  };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result));
};