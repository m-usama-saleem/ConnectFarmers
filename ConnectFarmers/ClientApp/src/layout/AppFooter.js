import React from 'react';

const AppFooter = () => {

    return (
        <div className="layout-footer">
            <div className="footer-logo-container">
                <img id="footer-logo" src="assets/layout/images/logo-white.png" alt="diamond-layout" />
                <span className="app-name">Connect Farmers</span>
            </div>
            <span className="copyright">&#169; Connect Farmers - 2021</span>
        </div>
    );
}

export default AppFooter;
