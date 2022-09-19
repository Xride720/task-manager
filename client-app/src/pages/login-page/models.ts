import { Location } from "react-router";

export enum LoginTab {
  Auth = "Auth",
  Registration= "Registration"
}

export type AuthLocationState = {
  from?: Location;
};