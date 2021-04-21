exports.up = function(knex) {
    return knex.schema.createTable('comments_contents', function (table){
        table.increments('id').primary();
        table
            .integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table
            .integer('content_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('contents')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.text('comment', 'longtext').notNullable();
        table.timestamps();
          
    });
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('comments_contents');
  };
  