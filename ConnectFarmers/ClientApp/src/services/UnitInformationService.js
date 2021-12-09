
import { ApiHooks } from '../hooks/index';
import { HandleError } from '../components/errorhandler/index'

function UnitInformationService() {

    const baseUrl = "api/unitinformation/";
    const { FetchGet } = ApiHooks();
    var { HandleApiError } = HandleError()

    const GetUnitInformation = async () => {
        var resData = await FetchGet(baseUrl + 'GetUnitInformation');
        if (resData.isError == true) {
            if (resData.data == null) {
                resData.data = { message: "Service not available" }
            } else {
                resData.data.message = await HandleApiError(resData)
            }
        }
        return resData;
    }
    return { GetUnitInformation };
}

export { UnitInformationService }