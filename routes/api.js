const express = require("express")
const app = express()

const AuthRoute = require("./api/AuthRoute")
const TaskRoute = require("./api/TaskRoute")

app.use("/auth", AuthRoute)
app.use("/task", TaskRoute)

module.exports = app