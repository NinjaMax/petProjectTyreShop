import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { adminRoutes, publicRoutes } from '../routes';
import {MAIN_ROUTE} from '../utils/consts';
import { Context } from '../context/Context';

const AppRouter = () => {
    const {user} = useContext<any | null>(Context);
    console.log(user);
    return (
        <Switch>
            {user._isAuth &&
            adminRoutes.map(({path, Component}) => 
            <Route key={path} path={path} component={Component} exact/>)
            }
            {publicRoutes.map(({path, Component}) => 
            <Route key={path} path={path} component={Component} exact/>)
            }
            <Redirect to={MAIN_ROUTE}/>
            
        </Switch>
    );
};

export default AppRouter;