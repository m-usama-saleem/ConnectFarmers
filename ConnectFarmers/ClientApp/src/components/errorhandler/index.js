import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';
import { LocalStorageContext } from '../../context';
import { useTranslation } from 'react-i18next';
import '../../i18n'
import { ApiHooks } from '../../hooks/index';

    
function HandleError() {
    const { t } = useTranslation();
    var { user, updateUser } = useContext(LocalStorageContext);
    const userServiceUrl = "api/user/";
    const { FetchGet } = ApiHooks();

    const HandleApiError = async (error) => {
        if ((error.status !== undefined && error.status != null && error.status == 401)
            || (error.data.status !== undefined && error.data.status != null && error.data.status == 401)) {
            if (user.isLoggedIn == true) {
                await LogoutUser();
            }
            return <Navigate to={{ pathname: ROUTES.LOGIN_VIEW }} />
        } else if ((error.status !== undefined && error.status != null && error.status == 404)
            || (error.data.status !== undefined && error.data.status != null && error.data.status == 404)) {
            return "";
        } else {
            console.error(error);
            return t('Somethingwentwrongwhilereadingsystemsdata')
        }
    }

    const LogoutUser = async () => {
        var resData = await FetchGet(userServiceUrl + 'logout');
        if (resData.data != null) {
            updateUser("token", "");
            updateUser("profile", "");
            updateUser("isLoggedIn", false);
            updateUser("isSessionExpired", false);

        } else {
            resData.data = { message: "Service not available" }
        }
    }
    return { HandleApiError };
}

export { HandleError }