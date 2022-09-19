import React, { FC } from "react";

import { UserQueryPropsType } from "./model";
import { useGetUsersQuery } from "@graphql/queries/__generated__/user.generated";

const queryName = 'getUsers';

const UserQuery: FC<UserQueryPropsType> = (props) => {
  const { 
    children: ChildrenComponent,
    input
  } = props;

  const { data, loading, error } = useGetUsersQuery({
    variables: {
      ids: input || []
    }
  });

  return (
    <ChildrenComponent 
      users={data ? data[queryName] || [] : []}
      usersLoading={loading}
      usersError={error}
    />
  );
};

export { UserQuery };