import { AuthControlChildrenPropsType } from "@hocs/mutations/AuthControl";

export type RegistrationFormProps = AuthControlChildrenPropsType & {
  handleSelectLoginForm: () => void;
}

export type RegistrationFormFieldsType = {
  email?: string;
  login?: string;
  password?: string;
  repeatPassword?: string;
}
