import React, { useState, createContext } from "react";

export const LocalStorageContext = createContext();

export const LocalStorageProvider = props => {

    let language; let textDirection;
    if (localStorage.getItem("culture") !== null) {
        language = localStorage.getItem("culture");
    } else {
        language = "en"
    }

    if (language == "en") {
        textDirection = "ltr"
    } else if (language == "ar") {
        textDirection = "rtl"
    }

    const [user, setUser] = useState({
        token: "",
        isLoggedIn: false,
        profile: {
            SysSerial: 0,
            Fullname: "",
            IsActive: false,
            StationId: 0,
            StationName: ""
        },
        isSessionExpired: true,
    });

    const [culture, setCulture] = useState({
        language: language,
        textDirection: textDirection
    });


    const updateUser = (field, val) => {

        setUser(user => ({
            ...user, [field]: val
        }));
    };

    const updateCulture = (field, val) => {

        setCulture(culture => ({
            ...culture, [field]: val
        }));
    };

    return (
        <LocalStorageContext.Provider value={{
            user, updateUser,
            culture, updateCulture,
        }}>
            {props.children}
        </LocalStorageContext.Provider>
    );

};