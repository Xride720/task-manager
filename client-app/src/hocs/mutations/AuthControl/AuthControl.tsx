import React, { FC } from "react";

import { DocumentNode, useMutation } from "@apollo/client";
import { UserInput } from "@generated/graphql";
import { AuthUserDocument, CreateUserDocument } from "@graphql/mutations/__generated__/user.generated";
import { AuthControlPropsType, AuthMutationType } from "./model";

const getMutation = (type: AuthMutationType): DocumentNode => {
  switch (type) {
    case "registration":
      return CreateUserDocument;
    case "auth":
      return AuthUserDocument;
  
    default:
      return AuthUserDocument;
  }
};

const AuthControl: FC<AuthControlPropsType> = (props) => {
  const { 
    children: ChildrenComponent,
    type,
    input
  } = props;

  const [ fetchAsync, { loading, error } ] = useMutation(getMutation(type), {
    variables: {
      input
    },
    
  });

  const mutationName = type === "auth" ? "authUser" : "createUser";

  const handler = async (input: UserInput) => {
    const response = await fetchAsync({
      variables: {
        input
      }
    });
    return response.data[mutationName];
  };

  return (
    <ChildrenComponent 
      handler={handler}
      loading={loading}
      error={error}
    />
  );
};

export { AuthControl };