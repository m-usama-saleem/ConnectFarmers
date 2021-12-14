import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import AppBreadcrumb from './AppBreadcrumb';
import AppMenu from './AppMenu';
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../constants/routes';
import { ProductService } from '../services/ProductService';
import { ImagePath } from '../constants/Data';
import { NotificationItems } from './NotificationItems';
import { ACTIVE_BIDS_VIEW, BOUGHT_LIST_VIEW, CREATE_PRODUCTS_VIEW, EXPIRE_BIDS_VIEW, LIST_PRODUCTS_VIEW, POST_BIDS_VIEW, PROFILE_VIEW, SOLD_LIST_VIEW } from '../constants/routes';
import { AuthenticationService } from '../services/AuthenticationService';

const AppTopbar = (props) => {

    const notificationsItemClassName = classNames('notifications-item', { 'active-menuitem': props.topbarNotificationMenuActive });
    const profileItemClassName = classNames('profile-item', { 'active-menuitem fadeInDown': props.topbarUserMenuActive });
    const { GetProductListCount, GetSoldProductListCount, GetBoughtProductListCount, GetPostBidsCount,
        GetActiveBidsCount, GetExpireBidsCount,
        CheckSoldBids, CheckExpireBids
    } = ProductService();
    const { Logout} = AuthenticationService();

    let navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    const [productListCount, setProductListCount] = useState(0);
    const [soldProductListCount, setSoldProductListCount] = useState(0);
    const [boughtProductListCount, setBoughtProductListCount] = useState(0);
    const [postBidsCount, setPostBidsCount] = useState(0);
    const [activeBidsCount, setActiveBidsCount] = useState(0);
    const [expireBidsCount, setExpireBidsCount] = useState(0);

    const [productListNotification, setProductListNotification] = useState(false);
    const [soldProductNotification, setSoldProductNotification] = useState(false);
    const [boughtProductNotification, setBoughtProductNotification] = useState(false);
    const [postBidsNotification, setPostBidsNotification] = useState(false);
    const [activeBidsNotification, setActiveBidsNotification] = useState(false);
    const [expireBidsNotification, setExpireBidsNotification] = useState(false);

    const [productListNotificationCount, setProductListNotificationCount] = useState(0);
    const [soldProductNotificationCount, setSoldProductNotificationCount] = useState(0);
    const [boughtProductNotificationCount, setBoughtProductNotificationCount] = useState(0);
    const [postBidsNotificationCount, setPostBidsNotificationCount] = useState(0);
    const [activeBidsNotificationCount, setActiveBidsNotificationCount] = useState(0);
    const [expireBidsNotificationCount, setExpireBidsNotificationCount] = useState(0);
    const [showNotificationCount, setShowNotificationCount] = useState("none");
    const [totalNotificationCount, setTotalNotificationCount] = useState(0);

    useEffect(() => {
        var ls = JSON.parse(localStorage.getItem("LoggedInUser"));
        var ls_up = JSON.parse(localStorage.getItem("LoggedInUserProfile"));
        setUser(ls.user)
        setUserProfile(ls_up)

        var plc = JSON.parse(localStorage.getItem("ProductListCount"));
        var splc = JSON.parse(localStorage.getItem("SoldProductListCount"));
        var bplc = JSON.parse(localStorage.getItem("BoughtProductListCount"));
        var pbc = JSON.parse(localStorage.getItem("PostBidsCount"));
        var abc = JSON.parse(localStorage.getItem("ActiveBidsCount"));
        var ebc = JSON.parse(localStorage.getItem("ExpireBidsCount"));

        setProductListCount(plc);
        setSoldProductListCount(splc);
        setBoughtProductListCount(bplc);
        setPostBidsCount(pbc);
        setActiveBidsCount(abc);
        setExpireBidsCount(ebc);


        function getN1Data() {
            return new Promise((res, rej) => {
                GetProductListCount().then(data => {
                    if (data == null || data == undefined) {
                        data = 0;
                    }
                    localStorage.setItem("ProductListCount", JSON.stringify(data))
                    if (productListCount < data) {
                        setProductListNotificationCount(data - productListCount)
                        setProductListNotification(true)
                        setProductListCount(data);
                    }
                    res(data)
                })
            })
        }
        function getN2Data(id) {
            return new Promise((res, rej) => {
                GetSoldProductListCount(id).then(data => {
                    if (data == null || data == undefined) {
                        data = 0;
                    }
                    localStorage.setItem("SoldProductListCount", JSON.stringify(data))
                    if (soldProductListCount < data) {
                        setSoldProductNotificationCount(data - soldProductListCount)
                        setSoldProductNotification(true)
                    }
                    setSoldProductListCount(data);
                    res(data)
                })
            })
        }
        function getN3Data(id) {
            return new Promise((res, rej) => {
                GetBoughtProductListCount(id).then(data => {
                    if (data == null || data == undefined) {
                        data = 0;
                    }
                    localStorage.setItem("BoughtProductListCount", JSON.stringify(data))
                    if (boughtProductListCount < data) {
                        setBoughtProductNotificationCount(data - boughtProductListCount)
                        setBoughtProductNotification(true)
                    }
                    setBoughtProductListCount(data);
                    res(data)
                })
            })
        }
        function getN4Data(id) {
            return new Promise((res, rej) => {
                GetPostBidsCount(id).then(data => {
                    if (data == null || data == undefined) {
                        data = 0;
                    }
                    localStorage.setItem("PostBidsCount", JSON.stringify(data))
                    if (postBidsCount < data) {
                        setPostBidsNotificationCount(data - postBidsCount)
                        setPostBidsNotification(true)
                    }
                    setPostBidsCount(data);
                    res(data)
                })
            })
        }
        function getN5Data(id) {
            return new Promise((res, rej) => {
                GetActiveBidsCount(id).then(data => {
                    if (data == null || data == undefined) {
                        data = 0;
                    }
                    localStorage.setItem("ActiveBidsCount", JSON.stringify(data))
                    if (activeBidsCount < data) {
                        setActiveBidsNotificationCount(data - activeBidsCount)
                        setActiveBidsNotification(true)
                    }
                    setActiveBidsCount(data);
                    res(data)
                })
            })
        }
        function getN6Data(id) {
            return new Promise((res, rej) => {
                GetExpireBidsCount(id).then(data => {
                    if (data == null || data == undefined) {
                        data = 0;
                    }
                    localStorage.setItem("ExpireBidsCount", JSON.stringify(data))
                    if (expireBidsCount < data) {
                        setExpireBidsNotificationCount(data - expireBidsCount)
                        setExpireBidsNotification(true)
                    }
                    setExpireBidsCount(data);
                    res(data)
                })
            })
        }

        function getAllData(user) {
            var promises = [];
            if (user && user.sysSerial) {
                promises.push(getN1Data());
                promises.push(getN2Data(user.sysSerial));
                promises.push(getN3Data(user.sysSerial));
                promises.push(getN4Data(user.sysSerial));
                promises.push(getN5Data(user.sysSerial));
                promises.push(getN6Data(user.sysSerial));

                Promise.all(promises).then((values) => {
                    var tn = 0;
                    var i = values.length; while (i--) tn += values[i]

                    var ptn = localStorage.getItem("TotalNotificationCount")
                    if (ptn == null || ptn == undefined) {
                        ptn = 0
                    }
                    else {
                        ptn = parseInt(ptn)
                    }

                    if (ptn < tn) {
                        setShowNotificationCount("block")
                        localStorage.setItem("TotalNotificationCount", JSON.stringify(tn))
                        setTotalNotificationCount(tn - ptn)
                    }
                })
            }
        }
        setInterval(() => { getAllData(ls.user) }, 10000)
        setInterval(() => { checkBids() }, 1000000)
    }, []);

    function checkBids(){
        CheckSoldBids().then(data => {
        })
        CheckExpireBids().then(data => {
        })
    }

    function clickNotification(e) {
        props.onTopbarNotification(e);

        setShowNotificationCount("none")

        if(productListNotificationCount > 0){
            setTimeout(() => {
                setProductListNotificationCount(0)
            }, 5000);
        }
        setTimeout(() => {
            setSoldProductNotificationCount(0)
            setBoughtProductNotificationCount(0)
            setPostBidsNotificationCount(0)
            setActiveBidsNotificationCount(0)
            setExpireBidsNotificationCount(0)
        }, 5000);
    }

    return (
        <div className="layout-topbar">
            <div className="topbar-left">
                <button type="button" className="menu-button p-link" onClick={props.onMenuButtonClick}>
                    <i className="pi pi-chevron-left"></i>
                </button>

                <Link to="/">
                    <img id="logo-horizontal" className="horizontal-logo" src="assets/layout/images/logo-white.png" alt="diamond-layout" />
                </Link>

                <span className="topbar-separator"></span>

                <div className="layout-breadcrumb viewname" style={{ textTransform: 'uppercase' }}>
                    <AppBreadcrumb routers={props.routers} />
                </div>

                <img id="logo-mobile" className="mobile-logo" src="assets/layout/images/logo-white.png" alt="diamond-layout" />
            </div>

            <AppMenu model={props.menu} menuMode={props.menuMode} active={props.menuActive} mobileMenuActive={props.staticMenuMobileActive}
                onMenuClick={props.onMenuClick} onMenuitemClick={props.onMenuitemClick} onRootMenuitemClick={props.onRootMenuitemClick}></AppMenu>

            <div className="layout-mask modal-in"></div>

            <div className="topbar-right">
                <ul className="topbar-menu">
                    <li className="search-item">
                        <button type="button" className="p-link" onClick={props.onSearchClick}>
                            <i className="pi pi-search"></i>
                        </button>
                    </li>
                    <li className={notificationsItemClassName}>
                        <button type="button" className="p-link" onClick={(e) => { clickNotification(e) }}>
                            <i className="pi pi-bell"></i>
                            <span className="topbar-badge" style={{ display: showNotificationCount }} >{totalNotificationCount}</span>
                        </button>
                        <ul className="notifications-menu fade-in-up"  >
                            <NotificationItems link={LIST_PRODUCTS_VIEW} count={productListNotificationCount} visible={productListNotification} header="New Product" />
                            <NotificationItems link={SOLD_LIST_VIEW} count={soldProductNotificationCount} visible={soldProductNotification} header="New Sold Product" />
                            <NotificationItems link={BOUGHT_LIST_VIEW} count={boughtProductNotificationCount} visible={boughtProductNotification} header="New Bought Product" />
                            <NotificationItems link={POST_BIDS_VIEW} count={postBidsNotificationCount} visible={postBidsNotification} header="New Post Bid" />
                            <NotificationItems link={ACTIVE_BIDS_VIEW} count={activeBidsNotificationCount} visible={activeBidsNotification} header="New Active Bid" />
                            <NotificationItems link={EXPIRE_BIDS_VIEW} count={expireBidsNotificationCount} visible={expireBidsNotification} header="New Expired Bid" />
                            {<li role="menuitem">
                                <button type="button" className="p-link" tabIndex="0">
                                    <i className="pi pi-shopping-cart"></i>
                                    <div className="notification-item">
                                        <div className="notification-summary">Notification</div>
                                        <div className="notification-detail">No new notification</div>
                                    </div>
                                </button>
                            </li>}
                        </ul>
                    </li>

                    <li className={profileItemClassName}>
                        <button type="button" className="p-link" onClick={props.onTopbarUserMenu}>
                            <img src={`${ImagePath}${userProfile ? userProfile.image : ""}`} alt="diamond-layout" className="profile-image" />
                            <span className="profile-name">Amelia Stone</span>
                        </button>
                        <ul className="profile-menu fade-in-up">
                            <li>
                                <button type="button" className="p-link" onClick={() => navigate(ROUTES.PROFILE_VIEW)}>
                                    <i className="pi pi-user"></i>
                                    <span>Profile</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={()=> Logout()} type="button" className="p-link">
                                    <i className="pi pi-power-off"></i>
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </li>


                </ul>
            </div>
        </div>
    );
}

export default AppTopbar;
