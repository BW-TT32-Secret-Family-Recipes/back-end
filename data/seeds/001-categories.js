
exports.seed = function (knex) {
  return knex('categories').truncate()
    .then(function () {
      return knex('categories').insert([
        { category_name: "Dinner" },
        { category_name: "Dessert" },
        { category_name: "Breakfast" }
      ]);
    });
};
