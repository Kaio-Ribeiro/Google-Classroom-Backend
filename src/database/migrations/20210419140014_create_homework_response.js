exports.up = function(knex) {
  return knex.schema.createTable('homework_responses', function (table){
      table.increments('id').primary();
      table
        .integer('homework_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('homework')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE');
      table.datetime('deliveryDate').notNullable();
      table.float('note').default(0).notNullable();
      table.timestamps();
        
  });
};

exports.down = function(knex) {
   return knex.schema.dropTable('homework_responses');
};
