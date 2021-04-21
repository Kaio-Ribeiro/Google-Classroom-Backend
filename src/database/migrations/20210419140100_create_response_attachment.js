exports.up = function(knex) {
    return knex.schema.createTable('response_attachments', function (table){
        table.increments('id').primary();
        table
        .integer('homework_response_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('homework_responses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table.string('path', 255).notNullable();
        table.string('extension', 10).notNullable();
        table.string('type', 100).notNullable();
        table.timestamps();
          
    });
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('response_attachments');
  };
  