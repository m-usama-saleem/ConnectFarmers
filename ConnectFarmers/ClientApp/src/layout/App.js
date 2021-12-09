import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppSearch from './AppSearch';
import AppRightMenu from './AppRightMenu';
import AppBreadcrumb from './AppBreadcrumb';

import { TestView } from '../views/Test/test';
import { LoginView } from '../views/Login/login';
import { ProfileView } from '../views/Profile/profile';
import RouterTable from '../router';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';



const App = () => {

    const [menuActive, setMenuActive] = useState(true);
    const [menuMode, setMenuMode] = useState('horizontal');
    const [colorScheme, setColorScheme] = useState('light');
    const [menuTheme, setMenuTheme] = useState('layout-sidebar-green');
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);
    const [topbarNotificationMenuActive, setTopbarNotificationMenuActive] = useState(false);
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const [logoColor, setLogoColor] = useState('white');
    const [menuColor, setMenuColor] = useState('green');
    const [componentTheme, setComponentTheme] = useState('green');
    const [logoUrl, setLogoUrl] = useState('assets/layout/images/logo-dark.svg')


    let menuClick = false;
    let searchClick = false;
    let userMenuClick = false;
    let notificationMenuClick = false;
    let rightMenuClick = false;
    let configClick = false;

    const menu = [
        {
            label: "Product", icon: "pi pi-fw pi-home",
            items: [
                { label: "List", icon: "pi pi-fw pi-home", to: "/listproducts" },
                { label: "Create", icon: "pi pi-fw pi-home", to: "/createproducts" }
            ]
        },
        { separator: true },
        {
            label: "Bids", icon: "pi pi-fw pi-id-card",
            items: [
                { label: "Active", icon: "pi pi-fw pi-id-card", to: "/activebids" },
                { label: "Expires", icon: "pi pi-fw pi-check-square", to: "/expirebids" },
            ]
        },
        { separator: true },
        {
            label: "Account", icon: "pi pi-fw pi-id-card",
            items: [
                { label: "Sold List", icon: "pi pi-fw pi-id-card", to: "/soldlist" },
                { label: "Bought List", icon: "pi pi-fw pi-check-square", to: "/boughtlist" },
                { label: "Post Bids", icon: "pi pi-fw pi-check-square", to: "/postbids" },

            ]
        }
    ];

    const routers = [
        { path: '/', component: TestView, exact: true, meta: { breadcrumb: [{ parent: '', label: 'Dashboard' }] } },
        { path: '/test', component: TestView, exact: true, meta: { breadcrumb: [{ parent: '', label: 'Test Page' }] } },
        { path: '/login', component: LoginView, exact: true, meta: { breadcrumb: [{ parent: '', label: 'Test Page' }] } },
        { path: '/profile', component: ProfileView, exact: true, meta: { breadcrumb: [{ parent: '', label: 'Test Page' }] } },
    ];

    useEffect(() => {
        if (staticMenuMobileActive) {
            blockBodyScroll();
        }
        else {
            unblockBodyScroll();
        }
    }, [staticMenuMobileActive]);

    useEffect(() => {

    }, []); 
    
    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            onSearchHide();
        }

        if (!userMenuClick) {
            setTopbarUserMenuActive(false);
        }

        if (!notificationMenuClick) {
            setTopbarNotificationMenuActive(false);
        }

        if (!rightMenuClick) {
            setRightMenuActive(false);
        }

        if (!menuClick) {
            if (isSlim() || isHorizontal()) {
                setMenuActive(false);
            }

            if (overlayMenuActive || staticMenuMobileActive) {
                hideOverlayMenu();
            }

            unblockBodyScroll();
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        searchClick = false;
        configClick = false;
        userMenuClick = false;
        rightMenuClick = false;
        notificationMenuClick = false;
        menuClick = false;
    };

    const onMenuClick = () => {
        menuClick = true;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarUserMenuActive(false);
        setTopbarNotificationMenuActive(false);
        setRightMenuActive(false);

        if (isOverlay()) {
            setOverlayMenuActive(prevOverlayMenuActive => !prevOverlayMenuActive);
        }

        if (isDesktop()) {
            setStaticMenuDesktopInactive(prevStaticMenuDesktopInactive => !prevStaticMenuDesktopInactive);
        }
        else {
            setStaticMenuMobileActive(prevStaticMenuMobileActive => !prevStaticMenuMobileActive);
        }

        event.preventDefault();
    };

    const onMenuitemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();

            if (isSlim() || isHorizontal()) {
                setMenuActive(false);
            }
        }
    };

    const onRootMenuitemClick = () => {
        setMenuActive(prevMenuActive => !prevMenuActive);
    };

    const onTopbarUserMenuButtonClick = (event) => {
        userMenuClick = true;
        setTopbarUserMenuActive(prevTopbarUserMenuActive => !prevTopbarUserMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const onTopbarNotificationMenuButtonClick = (event) => {
        notificationMenuClick = true;
        setTopbarNotificationMenuActive(prevTopbarNotificationMenuActive => !prevTopbarNotificationMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const toggleSearch = () => {
        setSearchActive(prevSearchActive => !prevSearchActive);
        searchClick = true;
    };

    const onSearchClick = () => {
        searchClick = true;
    };

    const onSearchHide = () => {
        setSearchActive(false);
        searchClick = false;
    };

    const onRightMenuClick = () => {
        rightMenuClick = true;
    };

    const onRightMenuButtonClick = (event) => {
        rightMenuClick = true;
        setRightMenuActive(prevRightMenuActive => !prevRightMenuActive);
        hideOverlayMenu();
        event.preventDefault();
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
        unblockBodyScroll();
    };

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const isSlim = () => {
        return menuMode === "slim";
    };

    const isHorizontal = () => {
        return menuMode === "horizontal";
    };

    const isOverlay = () => {
        return menuMode === "overlay";
    };

    const isDesktop = () => {
        return window.innerWidth > 1091;
    };

    const containerClassName = classNames('layout-wrapper',
        {
            'layout-overlay': menuMode === "overlay",
            'layout-static': menuMode === "static",
            'layout-slim': menuMode === "slim",
            'layout-horizontal': menuMode === "horizontal",
            'layout-sidebar-dim': colorScheme === "dim",
            'layout-sidebar-dark': colorScheme === "dark",
            'layout-overlay-active': overlayMenuActive,
            'layout-mobile-active': staticMenuMobileActive,
            'layout-static-inactive': staticMenuDesktopInactive && menuMode === "static",
            'p-input-filled': inputStyle === "filled",
            'p-ripple-disabled': !ripple,
        },
        colorScheme === 'light' ? menuTheme : '');

    return (
        <div className={containerClassName} data-theme={colorScheme} onClick={onDocumentClick}>
            <div className="layout-content-wrapper">
                <AppTopbar routers={routers} topbarNotificationMenuActive={topbarNotificationMenuActive} topbarUserMenuActive={topbarUserMenuActive}
                           onMenuButtonClick={onMenuButtonClick} onSearchClick={toggleSearch} onTopbarNotification={onTopbarNotificationMenuButtonClick}
                           onTopbarUserMenu={onTopbarUserMenuButtonClick} onRightMenuClick={onRightMenuButtonClick} onRightMenuButtonClick={onRightMenuButtonClick}
                           menu={menu} menuMode={menuMode} menuActive={menuActive} staticMenuMobileActive={staticMenuMobileActive} onMenuClick={onMenuClick}
                           onMenuitemClick={onMenuitemClick} onRootMenuitemClick={onRootMenuitemClick}></AppTopbar>

                <div className="layout-content">
                    <div className="layout-breadcrumb viewname" style={{ textTransform: 'uppercase' }}>
                        <AppBreadcrumb routers={routers} />
                    </div>
                    <RouterTable />

                    {/* {
                        routers.map((router, index) => {
                            if (router.exact) {
                                return <Route key={`router${index}`} path={router.path} exact component={router.component} />
                            }

                            return <Route key={`router${index}`} path={router.path} component={router.component} />
                        })
                    } */}
                </div>

                <AppFooter />
            </div>

            <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuClick={onRightMenuClick}></AppRightMenu>
            <AppSearch searchActive={searchActive} onSearchClick={onSearchClick} onSearchHide={onSearchHide} />
        </div>
    );
}

export default App;