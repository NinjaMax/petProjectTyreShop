import React, { Suspense, useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { adminRoutes, publicRoutes } from '../routes';
import {MAIN_ROUTE} from '../utils/consts';
import { Context } from '../context/Context';
import { observer } from 'mobx-react-lite';
import SpinnerCarRot from './spinners/SpinnerCarRot';

const AppRouter = observer(() => {
    const {user} = useContext<any | null>(Context);
    console.log(user);
    return (
        <Switch>
            {/* <Suspense fallback={<SpinnerCarRot/>}> */}
            {user.isAuth &&
            adminRoutes.map(({path, Component, exact}) => 
            <Route key={path} 
                path={path} 
                component={Component} 
                exact={exact}
            />
            )
            }
            {publicRoutes.map(({path, Component, exact}) => 
            <Route 
                key={path} 
                path={path} 
                component={Component} 
                exact={exact}
            />
            )
            }
            {/* </Suspense> */}
            <Redirect to={MAIN_ROUTE}/>
        </Switch>
    );
});

export default AppRouter;