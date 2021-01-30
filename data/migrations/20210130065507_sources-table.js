
exports.up = function (knex) {
    return knex.schema.createTable("sources", tbl => {
        tbl.increments();
        tbl.string("source_name", 128).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("sources")
        .dropTableIfExists("ingredients")
        .dropTableIfExists("categories")
        .dropTableIfExists("users")
};
