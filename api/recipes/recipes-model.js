const db = require("../../data/db-config");

module.exports = {
    getAll() {
        return db("recipes");
    },
    getById(id) {
        return db("recipes").where("id", id).first();
    },
    async insert(recipe) {
        await db("recipes").insert(recipe)
            .then(async id => {
                await db("recipes").where("id", id).first();
            })
            .catch(err => { console.log(err) })
    }
};
