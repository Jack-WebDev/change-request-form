/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("uploads",(t) => {
        t.uuid("id").primary().defaultTo(knex.fn.uuid());
        t.string("filename");
        t.string("path");
        t.string("mimetype");
        t.integer("size");
        t.uuid("nsfas_form_id").unsigned(); 
        t.foreign("nsfas_form_id").references("id").inTable("nsfas-form");
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("uploads")
};
