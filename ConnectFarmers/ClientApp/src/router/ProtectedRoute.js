import React, { useState, useContext, useEffect } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { LocalStorageContext } from "../context";
import { AuthenticationService } from '../services/AuthenticationService';
import * as ROUTES from '../constants/routes';


function ProtectedRoute(props) {

    const [isLoading, setIsLoading] = useState(true);
    const { RefreshToken } = AuthenticationService();
    const { user } = useContext(LocalStorageContext);

    const Component = props.element;

    useEffect(async () => {
        if (user.isLoggedIn === false) {
            setIsLoading(true);
            await RefreshToken();
            setTimeout(function () { setIsLoading(false); }, 1000);
        } else {
            setIsLoading(false);
        }
    }, [user.isLoggedIn]);

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    } else {
        if (user.isLoggedIn) {
            return <>
                <Route path={props.path} element={Component} />
            </>
        }
        else {
            return <Navigate to={{ pathname: ROUTES.LOGIN_VIEW }} />
        }
    }
};


export default ProtectedRoute;