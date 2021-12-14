
import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom' 


export const NotificationItems = (props) => {
    let navigate = useNavigate();
    return (
        props.count > 0 ?
        <li role="menuitem">
            <button type="button" className="p-link" tabIndex="0" onClick={()=>{navigate(props.link)}}>
                <i className="pi pi-shopping-cart"></i>
                <div className="notification-item">
                    <div className="notification-summary">{props.header}</div>
                    <div className="notification-detail">You have <strong>{props.count}</strong> {props.header}</div>
                </div>
            </button>
        </li> : null
    )
}

