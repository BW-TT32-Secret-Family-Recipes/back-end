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
    }
};