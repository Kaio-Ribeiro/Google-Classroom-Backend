exports.up = function(knex) {
    return knex.schema.createTable('content_types', function (table) {
        table.increments('id').primary();
        table.string('name', 45).notNullable();
        table.timestamps();
    })
}
  
exports.down = function(knex) {
  return knex.schema.dropTable('content_types');
}