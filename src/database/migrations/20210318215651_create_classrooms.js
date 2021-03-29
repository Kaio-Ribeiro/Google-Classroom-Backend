exports.up = function(knex) {
    return knex.schema.createTable('class_rooms', function (table) {
         table.increments('id').primary();
         table.string('title').notNullable();
         table.string('code').notNullable().unique();
         table.string('description').notNullable();
         table.string('subject');
         table.string('avatar');
         table.timestamps();
      })
  }
  
  exports.down = function(knex) {
  return knex.schema.dropTable('class_rooms');
}