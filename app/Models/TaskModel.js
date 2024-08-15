const { Model } = require("objection")
let knex

if(process.env.APP_ENV === 'dev'){
    knex = require('knex')(require('../../knexfile.js').development)
}else if(process.env.APP_ENV === 'prod'){
    knex = require('knex')(require('../../knexfile.js').production)
}

class TaskModel extends Model {
  static get tableName() {
    return "tasks"
  }

  static get relationMappings(){
    const UserModel = require("../Models/UserModel");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
            from: "tasks.user_id",
            to: "users.id",
        }
      },
    }
  }
}

TaskModel.knex(knex)

module.exports = TaskModel
