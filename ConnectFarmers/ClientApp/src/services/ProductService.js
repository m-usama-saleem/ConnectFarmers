import { useContext } from "react";
import { ApiHooks } from '../hooks/index';
import { HandleError } from '../components/errorhandler/index'
import { LocalStorageContext } from '../context';

function ProductService() {

    var { user, updateUser } = useContext(LocalStorageContext);
    var { HandleApiError } = HandleError()
    const baseUrl = "api/product/";
    const { FetchPost, FetchGet, FetchPostFile } = ApiHooks();

    const CreateProduct = async (model) => {
        var resData = await FetchPost(baseUrl + 'createproduct', model);
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

    const PlaceBid = async (model) => {
        var resData = await FetchPost(baseUrl + 'placebid', model);
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

    const GetProductList = async () => {
        var resData = await FetchGet(baseUrl + 'getproductlist');
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }

    const ProductHistory = async (model) => {
        var resData = await FetchGet(baseUrl + 'getproducthistory/' + model);
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }
    
    const GetSoldProductList = async (model) => {
        var resData = await FetchGet(baseUrl + 'getsoldproductlist/' + model);
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }

    const GetBoughtProductList = async (model) => {
        var resData = await FetchGet(baseUrl + 'getboughtproductlist/' + model);
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }

    const GetPostBids = async (model) => {
        var resData = await FetchGet(baseUrl + 'getpostbids/' + model);
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }

    const GetActiveBids = async (model) => {
        var resData = await FetchGet(baseUrl + 'getactivebids/' + model);
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }

    const GetExpireBids = async (model) => {
        var resData = await FetchGet(baseUrl + 'getexpirebids/' + model);
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }



    const GetProductListCount = async () => {
        var resData = await FetchGet(baseUrl + 'getproductlistcount');
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }
    
    const GetSoldProductListCount = async (model) => {
        var resData = await FetchGet(baseUrl + 'getsoldproductlistcount/' + model);
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }

    const GetBoughtProductListCount = async (model) => {
        var resData = await FetchGet(baseUrl + 'getboughtproductlistcount/' + model);
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }

    const GetPostBidsCount = async (model) => {
        var resData = await FetchGet(baseUrl + 'getpostbidscount/' + model);
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }

    const GetActiveBidsCount = async (model) => {
        var resData = await FetchGet(baseUrl + 'getactivebidscount/' + model);
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }

    const GetExpireBidsCount = async (model) => {
        var resData = await FetchGet(baseUrl + 'getexpirebidscount/' + model);
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }
    const CheckSoldBids = async (model) => {
        var resData = await FetchGet(baseUrl + 'checksoldbids');
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }
    const CheckExpireBids = async (model) => {
        var resData = await FetchGet(baseUrl + 'checkexpirebids');
        if (resData.isError === false) {
            if (resData.data != null) {
                return resData.data;
            }
        } else {
            if (resData.data == undefined || resData.data != null) {
                resData.data = { message: "Service not available" }
            }
        }
    }
     
    const UploadImages = async (model) => {
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
        CreateProduct, UploadImages, ProductHistory,
        GetProductList, GetSoldProductList, GetBoughtProductList, GetPostBids, GetActiveBids, GetExpireBids,
        GetProductListCount, GetSoldProductListCount, GetBoughtProductListCount, GetPostBidsCount, GetActiveBidsCount, GetExpireBidsCount,
        PlaceBid,CheckSoldBids, CheckExpireBids

    };
}

export { ProductService }