exports.up = function(knex) {
  return knex.schema.createTable('homeworks', function (table){
      table.increments('id').primary();
      table.integer('content_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('contents')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      table.datetime('dateLimit').notNullable();
      table.float('fullPoints').default(0).notNullable();
      table.timestamps();
        
  });
};

exports.down = function(knex) {
   return knex.schema.dropTable('homeworks');
};
