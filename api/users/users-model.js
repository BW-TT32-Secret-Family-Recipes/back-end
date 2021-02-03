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
        return db("users").where("id", id).first().then(user => {
            return db("users").select("id", "username").first()
        })
    },
    getBy(filter) {
        return db("users").where("username", filter).first();
    },
    async getUserRecipes(id) {
        const r = await db("recipes as r")
            .join("users as u", "r.user_id", "u.id")
            .join("categories as c", "r.category_id", "c.id")
            .join("sources as s", "r.source_id", "s.id")
            .join("ingredients as i", "r.ingredients_id", "i.id")
            .select("r.id", "u.username", "r.title", "c.category_name", "s.source_name", "i.ingredients", "r.instructions")
            .where("u.id", id).first();
        return r
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
