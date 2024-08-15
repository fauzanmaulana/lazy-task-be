const Router = require("express").Router();
const AuthController = require("../../app/Http/Controllers/AuthController");

Router.post("/login", AuthController.login)

module.exports = Router;
