exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
         table.increments('id').primary();
         table.string('name').notNullable();
         table.string('email').notNullable().unique();
         table.boolean('is_verify').defaultTo(false);
         table.string('password').notNullable();
         table.string('avatar');
         table.timestamps();
      })
  }
  
  exports.down = function(knex) {
  return knex.schema.dropTable("users");
}