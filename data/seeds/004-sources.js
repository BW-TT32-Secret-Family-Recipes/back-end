
exports.seed = function (knex) {
  return knex("sources").del()
    .then(function () {
      return knex("sources").insert([
        { source_name: "Granny" },
        { source_name: "Nestle Website" },
        { source_name: "Kathy" }
      ]);
    });
};
