
exports.up = function (knex) {
    return knex.schema.createTable("recipes", tbl => {
        tbl.increments();
        tbl.string("title", 128);
        tbl.integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        tbl.integer("category_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("categories")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        tbl.integer("source_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("sources")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        tbl.integer("ingredients_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("ingredients")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.string("instructions", 128).notNullable()
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("recipes")
        .dropTableIfExists("sources")
        .dropTableIfExists("ingredients")
        .dropTableIfExists("categories")
        .dropTableIfExists("users")
};
