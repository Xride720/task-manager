import { DocumentNode, useMutation } from "@apollo/client";
import { CreateTaskDocument, DeleteTaskDocument, UpdateTaskManyDocument } from "@graphql/mutations/__generated__/task.generated";
import React, { FC } from "react";
import { TaskControlPropsType, TaskMutationType } from "./model";

const getMutation = (type: TaskMutationType): DocumentNode => {
  switch (type) {
    case "add":
      return CreateTaskDocument;
    case "delete":
      return DeleteTaskDocument;
    case "update":
      return UpdateTaskManyDocument;
  
    default:
      return UpdateTaskManyDocument;
  }
};

const TaskControl: FC<TaskControlPropsType> = (props) => {
  const { 
    children,
    type,
    input
  } = props;

  const [ fetchAsync, { loading } ] = useMutation(getMutation(type), {
    variables: {
      input
    }
  });

  const handler = () => {
    
  };

  return (
    <div>{children}</div>
  );
};

export { TaskControl };