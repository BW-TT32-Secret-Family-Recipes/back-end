const db = require("../../data/db-config");

module.exports = {
    getAll() {
        return db("recipes");
    },
    async getById(id) {
        return db.raw(`
            select r.id, u.username, r.title,  s.source_name,c.category_name, i.ingredients, r.instructions 
        from recipes as r
        join users as u 
        	on r.user_id = u.id
        join categories as c
            on r.category_id = c.id
        join sources as s
            on r.source_id = s.id
        join ingredients as i
        	on r.ingredients_id =  i.id
        where r.id = ${id}`)

    },
    remove(id) {
        return db("recipes").where("id", id).del()
    },
    async update(recipe, recipeId) {
        const editRecipe = await db("recipes").where("id", recipeId).returning("*");
        const catId = await db("categories").where("id", editRecipe[0].category_id).update({ category_name: recipe.category });
        const sourceId = await db("sources").where("id", editRecipe[0].source_id).update({ source_name: recipe.source });
        const ingId = await db("ingredients").where("id", editRecipe[0].ingredients_id).update({ ingredients: recipe.ingredients });
        const recipeUpdate = await db("recipes").where("id", recipeId).update({ title: recipe.title, instructions: recipe.instructions });

        const recipes = await db("recipes as r")
            .join("users as u", "r.user_id", "u.id")
            .join("sources as s", "r.source_id", "s.id")
            .join("categories as c", "r.category_id", "c.id")
            .join("ingredients as i", "r.ingredients_id", "i.id")
            .select("r.id", "r. title", "c.category_name", "s.source_name", "i.ingredients", "r.instructions")
            .where("r.id", recipeId).first()
        return recipes


    }
};

// const r = await db.raw(`
//     select r.id, u.username, r.title, c.category_name,  s.source_name, i.ingredients, r.instructions 
//         from recipes as r
//             join users as u 
//                 on r.user_id = u.id
//             join sources as s
//                 on r.source_id = s.id
//             join categories as c
//                 on r.category_id = c.id
//             join ingredients as i
//                 on r.ingredients_id =  i.id
//                 where r.id = ${recipeId}`)
// return r.rows[0];