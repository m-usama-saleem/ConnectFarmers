
import React, { useState, useEffect, useContext, useRef } from "react";

export const ProfileView = () => {
   // const { t } = useTranslation();
   // const { culture } = useContext(LocalStorageContext)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
  

    // const { GetUnitInformation } = UnitInformationService();
    // const [unitInformationData, setUnitInformationData] = useState({});

    useEffect(async () => {

        // var result = await GetUnitInformation();
        // if (result.isError === false) {
        //     setUnitInformationData(result.data);
        //     setTimeout(function () {
        //         setIsLoading(false);
        //     }, 1000);
        // } else {
        //     setError(result.data.message)
        //     setTimeout(function () {
        //         setIsLoading(false);
        //     }, 1000);
        // }
    }, []);

        return (
            <div>profile page</div>)

}