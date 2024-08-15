const Response = require('../Services/HttpResponse')
const Auth = require('../../Providers/Auth')

const AuthController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const attempt = await Auth.attempt({ email, password })
            if (attempt.error) return Response.badRequest(res, attempt.message)

            return Response.success(res, attempt, "User logged")
        } catch (error) {
            if(process.env.APP_DEBUG === 'true') console.log(error)
            return Response.error(res, error.message)
        }
    }
}

module.exports = AuthController