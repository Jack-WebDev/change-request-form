/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("nsfas-form",(t) => {
        t.uuid("id").primary().defaultTo(knex.fn.uuid());
        t.string("propertyID");
        t.string("propertyName");
        t.string("propertyAddress");
        t.boolean("bankDetailsChange").defaultTo(false);
        t.boolean("propertyOwnershipChange").defaultTo(false);
        t.boolean("accountNameChange").defaultTo(false);
        t.boolean("otherChange").defaultTo(false);
        t.string("changeDescriptionDetails");
        t.string("reasonForChange");
        t.string("desiredOutcome");
        t.string("requestorName");
        t.string("requestorID");
        t.string("requestorJobTitle");
        t.date('date');
        t.boolean('critical').defaultTo(false);
        t.boolean('urgent').defaultTo(false);
        t.boolean('routine').defaultTo(false);
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("nsfas-form");
};
