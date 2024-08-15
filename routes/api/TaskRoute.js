const Router = require("express").Router();
const TaskController = require("../../app/Http/Controllers/TaskController");

Router.get("/", TaskController.all)
.post("/", TaskController.create)
.get("/:id", TaskController.find)
.post("/:id", TaskController.update)
.delete("/:id", TaskController.delete);

module.exports = Router;
