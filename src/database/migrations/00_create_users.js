export function up(knex) {
    return knex.schema.createTable('users', function (table) {
         table.increments('id').primary();
         table.string('name').notNullable();
         table.string('email').notNullable();
         table.string('password').notNullable();
         table.string('avatar').notNullable();
      })
  }
  
export function down(knex) {
  return knex.schema.dropTable("users");
}