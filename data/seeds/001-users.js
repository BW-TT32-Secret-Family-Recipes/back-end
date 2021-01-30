
exports.seed = function (knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        { username: "Grandma", password: "1234" },
        { username: "Grandpa", password: "1234" },
        { username: "Mom", password: "1234" }
      ]);
    });
};

