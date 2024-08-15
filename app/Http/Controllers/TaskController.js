const Response = require("../Services/HttpResponse")
const TaskModel = require("../../Models/TaskModel")

const TaskController = {
    all: async (req, res) => {
        try {
            const data = await TaskModel.query().orderBy("created_at", "desc")
            Response.success(res, data, "all task")
        } catch (error) {
            return Response.error(res, error.message)
        }
    },
    find: async (req, res) => {
        try {
            const id = req.params.id
            if(!id) return Response.badRequest(res, "missing params id")
            const data = await TaskModel.query().findById(id)
            if(!data) return Response.notFound(res)

            Response.success(res, data, "detail task")
        } catch (error) {
            return Response.error(res, error.message)
        }
    },
    create: async (req, res) => {
        try {
            const id = req.params.id
            if(!id) return Response.badRequest(res, "missing params id")
            const data = await TaskModel.query().findById(id)
            if(!data) return Response.notFound(res)

            await TaskModel.query().insert({
                title: req.body.title,
                content: req.body.content,
                status: req.body.status,
            })

            Response.success(res, data, "task created")
        } catch (error) {
            return Response.error(res, error.message)
        }
    },
    update: async (req, res) => {
        try {
            await TaskModel.query().patch({
                title: req.body.title,
                content: req.body.content,
                status: req.body.status,
            }).where('id', data.id)

            Response.success(res, data, "task created")
        } catch (error) {
            return Response.error(res, error.message)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            if(!id) return Response.badRequest(res, "missing params id")

            await TaskModel.query().deleteById(id)

            return Response.success(res, null, "task deleted")
        } catch (error) {
            return Response.error(res, error.message)
        }
    },
}

module.exports = TaskController