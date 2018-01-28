exports.up = (knex, Promise) => {
  return knex.schema.createTable('coffeeBeans', (t) => {
    // Primary key
    t.increments()
      .index();
    
    t.string('coffeeBeanName', 20)
      .unique()
      .notNullable()
      .index();
    
    // The longest coutry name is The United Kingdom of Great Britain and Northern Ireland, 48
    t.string('country', 50)
      .unique()
      .notNullable();
    
    t.timestamp('import_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('coffeeBeans');
};
