exports.up = function(knex) {
    return knex.schema.createTable('content_attachments', function (table) {
        table.increments('id').primary();
        table
        .integer('content_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('contents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('path', 255).notNullable();
      table.string('extension', 10).notNullable();
      table.string('type', 100).notNullable();
      table.timestamps();
    });
};
  
exports.down = function(knex) {
  return knex.schema.dropTable('content_attachments');
}