export function up(knex) {
    return knex.schema.createTable('user_has_class', function (table) {
         table.increments('id').primary();
         table.boolean('is_teacher').notNullable();
         table.boolean('is_owner').notNullable();

         table.integer('user_id')
          .notNullable()
          .references('id')
          .inTable('users')

         table.integer('classroom_id')
          .notNullable()
          .references('id')
          .inTable('classrooms')
      })
  }
  
export function down(knex) {
  return knex.schema.dropTable('user_has_class');
}