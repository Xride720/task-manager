import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks';
import { getAuthStorageAll } from '@services/localStorage/auth';
import { GO_LOGIN } from '@routes/constants';
import { observer } from 'mobx-react';

const AuthRequire: FC<React.PropsWithChildren<{}>> = observer(({ children }) => {
    const { isAuth } = useAuth();
    const location = useLocation();

    if (!isAuth) {
        const { email } = getAuthStorageAll();
        if (!email) {
            return <Navigate to={GO_LOGIN} state={{ from: location }} />;
        }
    }

    return (
        <>
            <div>{children}</div>
        </>
    );
});

export { AuthRequire };
