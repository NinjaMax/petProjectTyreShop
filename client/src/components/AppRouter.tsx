import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { adminRoutes, publicRoutes } from '../routes';
import {MAIN_ROUTE} from '../utils/consts';
import { Context } from '../context/Context';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const {user} = useContext<any | null>(Context);
    console.log(user);
    return (
        <Switch>
            {user.isAuth &&
            adminRoutes.map(({path, Component}) => 
            <Route key={path} path={path} component={Component} exact/>)
            }
            {publicRoutes.map(({path, Component}) => 
            <Route key={path} path={path} component={Component} exact/>)
            }
            <Redirect to={MAIN_ROUTE}/>
        </Switch>
    );
});

export default AppRouter;