const db = require("../../data/db-config");
module.exports = {
    getAll() {
        return db("users")
    },
    async insert(user) {
        await db("users").insert(user)
            .then(async id => {
                await db("users").where("id", id).first();
            })
            .catch(err => { console.log(err) });
    },
    getById(id) {
        return db("users").where("id", id).first();
    },
    getUserRecipes(id) {
        return db("users")
            .join("recipes", "users.id", "recipes.user_id")
            .select("*").where("user_id", id).first()
            .catch(err => { console.log(err) })
    }
};