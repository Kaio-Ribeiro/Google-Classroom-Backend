exports.up = function(knex) {
    return knex.schema.createTable('classrooms', function (table) {
         table.string('id').primary();
         table.string('title').notNullable();
         table.string('description').notNullable();
         table.string('subject').notNullable();
         table.string('avatar').notNullable();
      })
  }
  
  exports.down = function(knex) {
  return knex.schema.dropTable('classrooms');
}