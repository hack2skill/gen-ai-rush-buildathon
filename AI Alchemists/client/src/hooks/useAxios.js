const sendReqToServer = async (configObj) => {
    let response
    let error
    const { axiosInstance, url, method, requestConfig = {} } = configObj;

    try {
        const res = await axiosInstance[method.toLowerCase()](url, {
            ...requestConfig,
        });
        
        response = res.data;
    } catch (err) {
        error = err.message;
    }

    // console.log(response, error)
    return {response, error};
}

export {sendReqToServer};