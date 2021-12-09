import React, { useEffect, useContext, useState } from 'react'
import { Route,useLocation,Navigate } from 'react-router-dom';
import { LocalStorageContext } from '../context';
import * as ROUTES from '../constants/routes'
import App from './App';
import { LoginView } from '../views/Login/login';



export const  AppWrapper = (props) => {
    const { culture } = useContext(LocalStorageContext)

    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]);

    switch (location.pathname) {
        case '/login':
            debugger;
            return <LoginView />
        // case '/error':
        //     return <Route path="/error" component={Error} />
        // case '/notfound':
        //     return <Route path="/notfound" component={NotFound} />
        // case '/access':
        //     return <Route path="/access" component={Access} />
        default:
            return (
                <div dir={culture.textDirection}>
                    {<App />}
                </div>
            );
    }
}