const db = require("../../data/db-config");

module.exports = {
    getAll() {
        return db("users").select("id", "username")
    },
    async insert(user) {
        try {
            const response = await db("users").insert(user).returning("*")
            return ({ id: response[0].id, username: response[0].username })

        } catch (error) {
            return (`Username already exists, please try again.`);
        }
    },
    getById(id) {
        return db("users").where("id", id).first();
    },
    getBy(filter) {
        return db("users").where("username", filter).first();
    },
    async getUserRecipes(id) {
        return db.raw(`
        select r.id, u.username,  r.title, s.source_name, c.category_name, i.ingredients, r.instructions 
            from recipes as r
        join users as u 
            on r.user_id = u.id
        join sources as s
            on r.source_id = s.id
        join categories as c
            on r.category_id = c.id
        join ingredients as i
            on r.ingredients_id =  i.id
        where u.id = ${id}`)
    },
    async createUserRecipe(recipe, userId) {
        const { title, source, category, ingredients, instructions } = recipe;
        const sourceId = await db("sources").insert({ source_name: source }).returning("id")
        const catId = await db("categories").insert({ category_name: category }).returning("id")
        const ingId = await db("ingredients").insert({ ingredients: ingredients }).returning("id")
        const insertRecipeObject = { title, user_id: userId, category_id: catId[0], source_id: sourceId[0], instructions, ingredients_id: ingId[0] };
        const newRecipe = await db("recipes").insert({ ...insertRecipeObject }).returning("*")
        return newRecipe[0]
    }
};
