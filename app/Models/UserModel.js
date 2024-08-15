const { Model } = require("objection")
let knex

if(process.env.APP_ENV === 'dev'){
    knex = require('knex')(require('../../knexfile.js').development)
}else if(process.env.APP_ENV === 'prod'){
    knex = require('knex')(require('../../knexfile.js').production)
}

class UserModel extends Model {
  static get tableName() {
    return "users"
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}

UserModel.knex(knex)

module.exports = UserModel
