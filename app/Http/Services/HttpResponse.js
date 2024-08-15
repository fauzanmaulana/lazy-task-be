module.exports = {
    success: function (res, data, message='Request Successfull!') {
        return res.status(200).json({
            message: process.env.APP_DEBUG === 'true' ? message : 'Something went wrong',
            code: 200,
            data,
        })
    },
    error: function (res, message) {
        return res.status(500).json({
            message: process.env.APP_DEBUG === 'true' ? message : 'Someting went wrong',
            code: 500,
        })
    },
    notFound: function (res, message) {
        return res.status(404).json({
            message: process.env.APP_DEBUG === 'true' ? message : 'Not found',
            code: 404,
        })
    },
    badRequest: function (res, message){
        return res.status(500).json({
            message: process.env.APP_DEBUG === 'true' ? message : 'Validation error, please check your input',
            code: 500,
        })
    },
    forbidden: function (res, message) {
        return res.status(403).json({
            message,
            code: 403,
        })
    },
}
