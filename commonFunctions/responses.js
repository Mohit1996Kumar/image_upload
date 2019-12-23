let sendError = (res, message, data, errorCode) => {
    res.send({
        status_code: errorCode || 400,
        message: message || "",
        data: data || {}
    })
}

let sendSuccess = (res, message, data, errorCode) => {
    res.send({
        status_code: errorCode || 200,
        message: message || "",
        data: data || {}
    })
}

module.exports = {
    sendError: sendError,
    sendSuccess: sendSuccess
}