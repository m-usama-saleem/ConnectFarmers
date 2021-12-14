import { useContext } from "react";
import { LocalStorageContext } from '../context';


export const ApiHooks = () => {

    var { user } = useContext(LocalStorageContext);

    const FetchGet = async (url, requestBody) => {
        var returnResponse = { data: null, isLoading: true, isError: false };

        var header = !user.isLoggedIn ?
            { 'Content-Type': 'application/json' } :
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }

        const requestOptions = {
            method: 'GET',
            headers: header,
            body: JSON.stringify(requestBody)
        };

        await fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return new Promise((resolve) => {
                        if (response) {
                            response.json().then(json => resolve(json)).catch(() => resolve(null))
                        } else {
                            resolve(null)
                        }
                    })
                } else if (!response.ok) {
                    if (response.status == 401) {
                        returnResponse.isError = true;
                        return response;
                    } else {
                        returnResponse.isError = true;
                        return response.json();
                    }
                }
            })
            .then(data => {
                returnResponse.isLoading = false;
                returnResponse.data = data;
            })
            .catch(error => {
                returnResponse.isLoading = false;
                returnResponse.data = error;
                returnResponse.isError = true;
            })

        return returnResponse;
    }

    const FetchPost = async (url, requestBody) => {

        var returnResponse = { data: null, isLoading: true, isError: false };
        var header = !user.isLoggedIn ?
            { 'Content-Type': 'application/json' } :
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }

        const requestOptions = {
            method: 'POST',
            headers: header,
            body: JSON.stringify(requestBody)
        };

        await fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return new Promise((resolve) => {
                        if (response) {
                            response.json().then(json => resolve(json)).catch(() => resolve(null))
                        } else {
                            resolve(null)
                        }
                    })
                } else if (!response.ok) {
                    if (response.status == 401) {
                        returnResponse.isError = true;
                        return response;
                    } else {
                        returnResponse.isError = true;
                        return response.json();
                    }
                }
            })
            .then(data => {
                returnResponse.isLoading = false;
                returnResponse.data = data;
            })
            .catch(error => {
                returnResponse.isLoading = false;
                returnResponse.data = error;
                returnResponse.isError = true;
            })
        return returnResponse;
    }

    const FetchPostFile = async (url, requestBody) => {

        var returnResponse = { data: null, isLoading: true, isError: false };
        var header = !user.isLoggedIn ? {} :
            {
                'Authorization': 'Bearer ' + user.token,
            }

        const requestOptions = {
            method: 'POST',
            headers: header,
            body: requestBody
        };

        await fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return new Promise((resolve) => {
                        if (response) {
                            response.json().then(json => {
                                resolve(json)
                            }
                            ).catch(() => {
                                resolve(null)
                            })
                        } else {
                            resolve(null)
                        }
                    })
                } else if (!response.ok) {
                    if (response.status == 401) {
                        returnResponse.isError = true;
                        return response;
                    } else {
                        returnResponse.isError = true;
                        return response.json();
                    }
                }
            })
            .then(data => {
                returnResponse.isLoading = false;
                returnResponse.data = data;
            })
            .catch(error => {
                returnResponse.isLoading = false;
                returnResponse.data = error;
                returnResponse.isError = true;
            })
        return returnResponse;
    }

    const FetchFile = async (url) => {
        const filename = url.substring(url.lastIndexOf('/') + 1);
        var returnResponse = { data: null, isLoading: true, isError: false };

        var header = !user.isLoggedIn ?
            { 'Content-Type': 'text/html' } :
            {
                'Content-Type': 'text/html',
                'Authorization': 'Bearer ' + user.token
            }

        const requestOptions = {
            method: 'GET',
            headers: header
        };

        await fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    if (response.headers.get('Content-Type').indexOf('application') > -1) {
                        return response.text();
                    }
                } else if (!response.ok) {
                    if (response.status == 401) {
                        returnResponse.isError = true;
                        return response;
                    } else {
                        returnResponse.isError = true;
                        return response.json();
                    }
                }
            })
            .then(text => {
                if (text.status == 401) {
                    returnResponse.isLoading = false;
                    returnResponse.data = text;
                    return;
                }
                const url = window.URL.createObjectURL(new Blob([text]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);

                document.body.appendChild(link);

                link.click();

                link.parentNode.removeChild(link);
                returnResponse.isLoading = false;
                returnResponse.data = null;
                returnResponse.isError = false;

            })
            .catch(error => {
                returnResponse.isLoading = false;
                returnResponse.data = error;
                returnResponse.isError = true;
            })

        return returnResponse;
    }

    return { FetchGet, FetchPost, FetchFile, FetchPostFile };
}