exports.up = function(knex) {
    return knex.schema.createTable('class_room_users', function (table) {
         table.increments('id').primary();
         table.boolean('is_teacher').defaultTo(false).notNullable();
         table.boolean('is_owner').defaultTo(false).notNullable();

         table.integer('user_id')
          .notNullable()
          .references('id')
          .inTable('users')

         table.string('class_room_id')
          .notNullable()
          .references('id')
          .inTable('class_rooms')

          table.timestamps();
      })
  }
  
exports.down = function(knex) {
  return knex.schema.dropTable('class_room_users');
}