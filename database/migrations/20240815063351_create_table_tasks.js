/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', (table) => {
		table.increments('id').primary();
        table.integer('user_id').unsigned();
		table.string('title')
		table.text('content').nullable()
        table.string('status').defaultTo("In Progress")
        table.datetime('deleted_at').nullable()
		table.timestamps(true, true);

        table.foreign("user_id").references("users.id");
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("tasks");
};
