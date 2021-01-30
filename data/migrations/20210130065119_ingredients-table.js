
exports.up = function (knex) {
    return knex.schema.createTable("ingredients", tbl => {
        tbl.increments();
        tbl.string("ingredients", 128).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("ingredients")
        .dropTableIfExists("categories")
        .dropTableIfExists("users")
};
