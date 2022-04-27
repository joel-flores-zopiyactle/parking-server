const httpResponse = (res, message, data = [], status= 400) => {

    const response = {
        code: status,
        message: message,
        data: data
    }

    res.status(status);
    res.json({response});
}

module.exports = { httpResponse }