import React, { Suspense, lazy } from 'react';
import * as ROUTES from '../constants/routes';
import { Routes, Route } from 'react-router-dom';
//import { useLoading, ThreeDots } from '@agney/react-loading';
import ProtectedRoute from './ProtectedRoute'
import NotFound from '../components/errorhandler/NotFound';
const TestView = React.lazy(() => import('../views/Test/index'));
const LoginView = lazy(() => import('../views/Login/index'));
const ProfileView = lazy(() =>import('../views/Profile/index') )
export default function RouterTable(props) {
    return (
        <Suspense fallback={
            <p>Loading</p>
        }>
            <Routes>
                <Route exact path={ROUTES.LOGIN_VIEW} element={<LoginView />} />
                <Route exact path={ROUTES.PROFILE_VIEW} element={<ProfileView />} />
                <ProtectedRoute exact path='/test' element={<TestView />} />
                <Route exact path='/*' element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}

