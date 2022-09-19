import { AuthControlChildrenPropsType } from "@hocs/mutations/AuthControl";

export type LoginFormProps = AuthControlChildrenPropsType & {
  prop?:string
}

export type LofinFormFieldsType = {
  login?: string;
  password?: string;
}

