
exports.seed = function (knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { username: "Grandma", password: "1234" },
        { username: "Grandpa", password: "1234" },
        { username: "Mom", password: "1234" }
      ]);
    });
};

