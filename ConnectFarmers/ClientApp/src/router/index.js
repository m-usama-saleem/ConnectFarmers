import React, { Suspense, lazy } from 'react';
import * as ROUTES from '../constants/routes';
import { Routes, Route } from 'react-router-dom';
//import { useLoading, ThreeDots } from '@agney/react-loading';
// import ProtectedRoute from './ProtectedRoute'
import NotFound from '../components/errorhandler/NotFound';

import { CreateProductsView, ListProductsView } from '../views/Product';
import { BoughtListView, PostBidsView, SoldListView } from '../views/Account';
import { ExpireBidsView, ActiveBidsView } from '../views/Bid';
const TestView = React.lazy(() => import('../views/Test/index'));
const LoginView = lazy(() => import('../views/Login/index'));
const ProfileView = lazy(() => import('../views/Profile/index'));

export default function RouterTable(props) {
    return (
        <Suspense fallback={
            <p>Loading</p>
        }>
            <Routes>
                <Route exact path={ROUTES.LOGIN_VIEW} element={<LoginView />} />
                <Route exact path={ROUTES.PROFILE_VIEW} element={<ProfileView />} />

                <Route exact path={ROUTES.BOUGHT_LIST_VIEW} element={<BoughtListView />} />
                <Route exact path={ROUTES.POST_BIDS_VIEW} element={<PostBidsView />} />
                <Route exact path={ROUTES.SOLD_LIST_VIEW} element={<SoldListView />} />

                <Route exact path={ROUTES.ACTIVE_BIDS_VIEW} element={<ActiveBidsView />} />
                <Route exact path={ROUTES.EXPIRE_BIDS_VIEW} element={<ExpireBidsView />} />

                <Route exact path={ROUTES.CREATE_PRODUCTS_VIEW} element={<CreateProductsView />} />
                <Route exact path={ROUTES.LIST_PRODUCTS_VIEW} element={<ListProductsView />} />

                {/* <ProtectedRoute exact path='/test' element={<TestView />} /> */}
                {/* <Route exact path='/*' element={<NotFound />} /> */}
            </Routes>
        </Suspense>
    )
}

