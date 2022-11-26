import React, { FC, useEffect } from "react";
import { useLatestTasksSubscription } from "@graphql/subscription/__generated__/task.generated";

import { TaskSubscriptionPropsType } from "./model";
import { Task } from "@generated/graphql";
import { sortTask } from "@pages/task-list-page/helpers";
import store from "@store";

const TaskSubscription: FC<TaskSubscriptionPropsType> = (props) => {
  const { 
    children,
    setTasks,
    className: __className
  } = props;

  const { userId } = store.AuthStore;
  
  const { data, loading } = useLatestTasksSubscription({
    variables: { userId },
  });

  useEffect(() => {
    const sortedArr = sortTask(data?.latestTasks?.filter(item => !!item) as Task[] || []);
    setTasks && setTasks(sortedArr);
  }, [data]);

  return (
    <div className={__className}>{children}</div>
  );
};

export { TaskSubscription };