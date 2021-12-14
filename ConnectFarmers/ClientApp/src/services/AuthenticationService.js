import { useContext } from "react";
import { ApiHooks } from '../hooks/index';
import { HandleError } from '../components/errorhandler/index'
import { LocalStorageContext } from '../context';

function AuthenticationService() {

    var { user, updateUser } = useContext(LocalStorageContext);
    var { HandleApiError } = HandleError()
    const baseUrl = "api/user/";
    const { FetchPost, FetchGet, FetchPostFile } = ApiHooks();

    const Login = async (loginModel) => {

        var resData = await FetchPost(baseUrl + 'login', loginModel);
        if (resData.isError == true) {
            return resData;
        } else {
            if (resData.data != null) {
                updateUser("token", resData.data.token);
                updateUser("profile", resData.data.user);
                updateUser("isLoggedIn", true);
                updateUser("isSessionExpired", false);
                localStorage.setItem("LoggedInUser", JSON.stringify(resData.data))

                var proData = await FetchGet(baseUrl + 'Profile/' + resData.data.user.sysSerial);
                if (proData.isError == true) {
                    return proData;
                } else {
                    if (proData.data != null) {
                    }
                    localStorage.setItem("LoggedInUserProfile", JSON.stringify(proData.data))
                }
            } else {
                resData.data = { message: "Service not available" }
            }
        }
        return resData;

    }

    const RefreshToken = async () => {
        var resData = await FetchPost(window.location.origin.toString() + "/" + baseUrl + 'refresh');
        console.log("=====RefreshToken Data=====" + resData);
        if (resData.isError === false) {
            if (resData.data != null) {
                updateUser("isLoggedIn", true);
                updateUser("token", resData.data.token);
                updateUser("profile", resData.data.user);
                updateUser("isSessionExpired", true);
            }
        } else {
            HandleApiError(resData.data);
        }
        return true;
    }

    const Logout = async () => {
        var resData = await FetchGet(window.location.origin.toString() + "/" + baseUrl + 'logout');
        if (resData.isError === false) {
            if (resData.data != null) {
                updateUser("token", "");
                updateUser("profile", "");
                updateUser("isLoggedIn", false);
                localStorage.removeItem("LoggedInUser")
            }
        } else {
            HandleApiError(resData.data);
        }
    }

    const Register = async (loginModel) => {
        var resData = await FetchPost(baseUrl + 'register', loginModel);
        if (resData.isError == true) {
            if (resData.data.status = 409) {
                resData.data.message = "User with this email already exists";
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
        return resData;

    }

    const GetProfile = async (id) => {
        var resData = await FetchGet(baseUrl + 'Profile/' + id);
        if (resData.isError === false) {
            if (resData.data != null) {
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }

    const UpdateUserProfile = async (loginModel) => {
        var resData = await FetchPost(baseUrl + 'addprofile', loginModel);
        if (resData.isError == true) {
            if (resData.data.status = 409) {
                resData.data.message = "User with this email already exists";
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
        return resData;
    }

    const UploadImage = async (model) => {
        var resData = await FetchPostFile(baseUrl + 'upload', model);
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data.content;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }

    return {
        Login, RefreshToken, Logout, Register,
        GetProfile, UploadImage, UpdateUserProfile
    };
}

export { AuthenticationService }