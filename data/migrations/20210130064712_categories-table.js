
exports.up = function (knex) {
    return knex.schema
        .createTable("categories", tbl => {
            tbl.increments();
            tbl.string("category_name", 128).notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("categories")
        .dropTableIfExists("users")
};
