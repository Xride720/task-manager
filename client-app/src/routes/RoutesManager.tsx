import React, { Suspense as _Suspense, FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@components/Layout';

import { GO_CHAT, GO_HOME, GO_LOGIN, GO_TODO_LIST } from './constants';
import TodoListPage from '@pages/task-list-page/TaskListPage';
import { LoginPage } from '@pages/login-page/LoginPage';
import { AuthRequire } from '@hocs';
import { UserQuery } from '@hocs/queries/UserQuery';
import { ChatPage } from '@pages/chat-page';
import { ChatTypeQuery } from '@hocs/queries/ChatTypeQuery';

// const TodoListPage = React.lazy(() => import('@pages/todo-list-page/TodoListPage'));

// const Suspense: FC<{children: JSX.Element}> = (props) => {
//   return <_Suspense fallback={ <Loader /> } children={props.children}/>
// };
 
const RoutesManager: FC = () => {
  return (
    <>
      <Routes>
        <Route path={GO_HOME} element={
          <AuthRequire>
            <Layout />
          </AuthRequire>
        }>
          <Route path={GO_TODO_LIST} element={<UserQuery children={(props) => <TodoListPage {...props} />} />} />
          <Route path={GO_CHAT} element={
            <UserQuery children={(usersProps) => <ChatPage {...usersProps} />} />
          } />
          <Route path={"*"} element={(
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <h1 style={{color: "#fff", margin: "10vh auto"}}>Not Found</h1 >
            </div>
            )} />
        </Route>
        <Route path={GO_LOGIN} element={<LoginPage />}/>
      </Routes>
    </>
  )
};

export default RoutesManager;
