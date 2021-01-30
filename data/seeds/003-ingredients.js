
exports.seed = function (knex) {
  return knex('ingredients').del()
    .then(function () {
      return knex('ingredients').insert([
        { ingredients: "1 package dough, 1 can sauce, 16 oz cheese" },
        { ingredients: "1 box brownie mix, 3 eggs, 1/4 cup water, 1/2 cup oil" },
        { ingredients: "1 packet oatmeal, 1 cup water, 2 tablespoons brown sugar" }
      ]);
    });
};
