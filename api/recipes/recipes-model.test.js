const Recipes = require("./recipes-model");
const Users = require("../users/users-model");
const db = require("../../data/db-config");

const andrew = { username: "andrew", password: "1234" };
const newRecipe = {
    title: "testing",
    category: "dinner",
    source: "mom",
    ingredients: "love",
    instructions: "cook"
};
const newRecipe2 = {
    title: "yum food",
    category: "snacks",
    source: "gpa",
    ingredients: "yay",
    instructions: "cook"
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
});

afterAll(async (done) => {
    await db.destroy();
    done();
});

describe("recipes-model", () => {
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
        let recipeResponse = {
            username: 'andrew',
            title: 'yum food',
            source_name: 'gpa',
            category_name: 'snacks',
            ingredients: 'yay',
            instructions: 'cook'
        }
        await db("users").insert(andrew);
        a = await Users.createUserRecipe(newRecipe, 1);
        console.log(a, "*A*A*A*A*A")
        r = await Users.createUserRecipe(newRecipe2, 1);
        console.log(r, "R*R*R*R")
        res = await Recipes.getById(4)
        expect(res[0]).toMatchObject({
            id: 4, ...recipeResponse
        })
    });
});

