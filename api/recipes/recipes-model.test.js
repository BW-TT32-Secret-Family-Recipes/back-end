const Recipes = require("./recipes-model");
const Users = require("../users/users-model");
const db = require("../../data/db-config");

const andrew = { username: "andrew", password: "1234" };
const christina = { username: "christina", password: "1234" };
const newRecipe = {
    title: "testing",
    category: "dinner",
    source: "mom",
    ingredients: "love",
    instructions: "cook"
};
const newRecipe2 = {
    title: "test",
    category: "snacks",
    source: "gpa",
    ingredients: "lots",
    instructions: "cook it"
};
const editRecipe = {
    title: "testing 123",
    category: "dinner",
    source: "grandma",
    ingredients: "love",
    instructions: "cook"
};

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('users').truncate();
    await db("recipes").truncate();
});

afterAll(async (done) => {
    await db.destroy();
    done();
});

describe("recipes-model", () => {
    //the newRecipeResponse obj is representing the data names 
    //that come back as a response from the db, just realized 
    //I named the keys "category_name" and "source_name", 
    //NOT just category and source. *FACE PALM*
    let newRecipeResponse = {
        username: 'andrew',
        title: 'test',
        category_name: 'snacks',
        source_name: 'gpa',
        ingredients: 'lots',
        instructions: 'cook it'
    }
    it("can get all recipes", async () => {
        let res;
        await db("users").insert(andrew);
        await Users.createUserRecipe(newRecipe, 1);
        await Users.createUserRecipe(newRecipe2, 1);
        res = await Recipes.getAll();
        expect(res).toHaveLength(2);
    });
    it("can get a recipe by id", async () => {
        let res;
        await db("users").insert(andrew);
        await Users.createUserRecipe(newRecipe, 1);
        await Users.createUserRecipe(newRecipe2, 1);
        res = await Recipes.getById(2)
        expect(res).toMatchObject({ username: "andrew", ...newRecipeResponse })
    });
    it("can delete a recipe by id", async () => {
        let res;
        await db("users").insert(andrew);
        await db("users").insert(christina);
        await Users.createUserRecipe(newRecipe, 1);
        await Users.createUserRecipe(newRecipe2, 1);
        await Recipes.remove(1);
        res = await Users.getUserRecipes(1)
        expect(res).toMatchObject({ id: 2, username: "andrew", ...newRecipeResponse })
    });
});

