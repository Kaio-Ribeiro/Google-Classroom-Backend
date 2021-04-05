exports.up = function(knex) {
    return knex.schema.createTable('contents', function (table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE');
        table
            .integer('class_room_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('class_rooms')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table
            .integer('content_type_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('content_types')
            .onUpdate('CASCADE');
        table.string('title', 80).notNullable();
        table.text('description', 'longtext').notNullable();
        table.timestamps();
    })
}
  
exports.down = function(knex) {
  return knex.schema.dropTable('contents');
}