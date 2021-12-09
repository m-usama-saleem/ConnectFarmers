import React, { useState } from 'react';
import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const AppRightMenu = (props) => {
    
    const sidebarClassName = classNames('layout-sidebar-right', {
        'layout-sidebar-right-active': props.rightMenuActive
    });

    return (
        <div className={sidebarClassName} onClick={props.onRightMenuClick}>
            <h5>Temporary </h5>
        </div>
    );
}

export default AppRightMenu;
