
exports.seed = function (knex) {
  return knex("recipes").truncate()
    .then(function () {
      return knex("recipes").insert([
        { title: "Pizza", user_id: 1, category_id: 1, source_id: 1, ingredients_id: 1, instructions: "1. Preheat the oven to 400 degrees F, 2. Roll dough to desired shape, 3. Ladle sauce onto dough, 4. Add Cheese, 5. Bake 15 minutes " },
        { title: "Brownies", user_id: 2, category_id: 2, source_id: 2, ingredients_id: 2, instructions: "1. Preheat the oven to 350 degrees F, 2. Mix wet ingredients in bowl, 3. Add dry ingredients to bowl, 4. Mix, 5. Bake for 20 minutes" },
        { title: "Oatmeal", user_id: 3, category_id: 3, source_id: 3, ingredients_id: 3, instructions: "1. Add packaged oats to a microwave-proof bowl, 2. Add water, 3. Microwave 2 minutes" }
      ]);
    });
};
