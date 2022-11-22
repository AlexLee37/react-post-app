import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/context';
import { privateRoutes, publicRoutes } from '../router/router';

function AppRouter() {
    const {isAuth} = useContext(AuthContext);
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route element={route.element} path={route.path} exact={route.exact} key={route.path}/>
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route element={route.element} path={route.path} exact={route.exact} key={route.path}/>
                )}
            </Routes>
    );
}

export default AppRouter;