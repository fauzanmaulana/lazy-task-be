const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UserModel = require('../Models/UserModel')

const Auth = {
    attempt: async (credential) => {
        let user = await UserModel.query().findOne({ email: credential.email })

        if (user instanceof UserModel === false) {
            return {
                message: "Can't find that user",
                error: true
            }
        }

        const isPasswordMatch = await bcrypt.compare(credential.password, user.password)

        if (!isPasswordMatch) {
            return {
                message: "Wrong password",
                error: true
            }
        }

        const apiKey = jwt.sign({
            id: user.id, 
            email: user.email, 
            username: user.username, 
            fullname: user.fullname,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: 1000 * 60 * 30 });
        user = user.toJSON()
        user.apiKey = apiKey

        delete user["id"]
        delete user["password"]

        return user
    },

    user: async (req) => {
        let apiKey = req.headers.authorization, decoded;

        if (!apiKey) {
            return {
                message: "No api key has been set",
                error: true
            }
        }

        apiKey = apiKey.split(' ')[1]

        try {
            decoded = jwt.verify(apiKey, process.env.JWT_SECRET);
            return decoded
        } catch (e) {
            return false
        }
    },
}

module.exports = Auth