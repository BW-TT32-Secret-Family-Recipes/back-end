const db = require("../../data/db-config");

module.exports = {
    getAll() {
        return db("recipes");
    },
    async getById(id) {
        return db.raw(`
            select r.id, u.username, r.title, c.category_name, i.ingredients, r.instructions 
        from recipes as r
        join users as u 
        	on r.user_id = u.id
        join categories as c
        	on r.category_id = c.id
        join ingredients as i
        	on r.ingredients_id =  i.id
        where r.id = ${id}`)

    }
};
